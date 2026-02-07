"""
Electric Motor Temperature Prediction - Model Training Script
This script trains a Decision Tree Regressor model for predicting motor temperatures
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.svm import SVR
from sklearn.metrics import r2_score, mean_squared_error
import joblib
import matplotlib.pyplot as plt
import seaborn as sns

# Set random seed for reproducibility
np.random.seed(42)

def load_data(filepath):
    """Load the dataset"""
    print("Loading dataset...")
    df = pd.read_csv(filepath)
    print(f"Dataset shape: {df.shape}")
    print(f"Columns: {df.columns.tolist()}")
    return df

def preprocess_data(df):
    """
    Preprocess the dataset:
    - Drop unwanted features (stator components, torque)
    - Handle missing values
    - Handle outliers
    """
    print("\nPreprocessing data...")
    
    # Features to keep for prediction
    # We're predicting permanent magnet (pm) temperature
    features_to_keep = [
        'ambient',
        'coolant',
        'u_d',
        'u_q',
        'motor_speed',
        'i_d',
        'i_q',
        'pm'  # target variable
    ]
    
    # Filter dataset to keep only necessary columns
    if all(col in df.columns for col in features_to_keep):
        df = df[features_to_keep]
    else:
        print("Warning: Not all required columns found. Using available columns.")
    
    # Check for missing values
    print(f"\nMissing values:\n{df.isnull().sum()}")
    
    # Drop rows with missing values
    df = df.dropna()
    
    # Remove negative values if any (temperature can't be negative)
    df = df[(df >= 0).all(axis=1)]
    
    print(f"Dataset shape after preprocessing: {df.shape}")
    return df

def handle_outliers(df, columns):
    """
    Handle outliers using IQR method with capping
    """
    print("\nHandling outliers...")
    df_clean = df.copy()
    
    for col in columns:
        Q1 = df_clean[col].quantile(0.25)
        Q3 = df_clean[col].quantile(0.75)
        IQR = Q3 - Q1
        
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        
        # Cap outliers instead of removing them
        df_clean[col] = df_clean[col].clip(lower_bound, upper_bound)
    
    return df_clean

def split_and_scale_data(df, target_column='pm'):
    """
    Split data into train/test and apply MinMax scaling
    """
    print("\nSplitting and scaling data...")
    
    # Separate features and target
    X = df.drop(target_column, axis=1)
    y = df[target_column]
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Scale features
    scaler = MinMaxScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    print(f"Training set: {X_train_scaled.shape}")
    print(f"Test set: {X_test_scaled.shape}")
    
    return X_train_scaled, X_test_scaled, y_train, y_test, scaler

def train_models(X_train, X_test, y_train, y_test):
    """
    Train multiple models and compare performance
    """
    print("\nTraining models...")
    
    models = {
        'Linear Regression': LinearRegression(),
        'Decision Tree': DecisionTreeRegressor(
            random_state=42, 
            max_depth=15,
            min_samples_split=10,
            min_samples_leaf=5
        ),
        'Random Forest': RandomForestRegressor(
            n_estimators=100, 
            random_state=42,
            max_depth=15,
            min_samples_split=10
        ),
        'SVR': SVR(kernel='rbf', C=10, gamma='scale')
    }
    
    results = {}
    
    for name, model in models.items():
        print(f"\nTraining {name}...")
        
        # Train
        model.fit(X_train, y_train)
        
        # Predict
        y_pred = model.predict(X_test)
        
        # Evaluate
        r2 = r2_score(y_test, y_pred)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        
        results[name] = {
            'model': model,
            'r2_score': r2,
            'rmse': rmse,
            'predictions': y_pred
        }
        
        print(f"R² Score: {r2:.4f}")
        print(f"RMSE: {rmse:.4f}")
    
    return results

def save_best_model(results, scaler):
    """
    Save the best performing model
    """
    print("\nSaving best model...")
    
    # Find best model based on R² score
    best_model_name = max(results, key=lambda x: results[x]['r2_score'])
    best_model = results[best_model_name]['model']
    
    print(f"Best model: {best_model_name}")
    print(f"R² Score: {results[best_model_name]['r2_score']:.4f}")
    print(f"RMSE: {results[best_model_name]['rmse']:.4f}")
    
    # Save model and scaler
    joblib.dump(best_model, 'model.save')
    joblib.dump(scaler, 'transform.save')
    
    print("Model saved as 'model.save'")
    print("Scaler saved as 'transform.save'")
    
    return best_model_name

def create_sample_data():
    """
    Create a sample dataset for demonstration purposes
    This function generates synthetic data if real dataset is not available
    """
    print("Creating sample dataset...")
    
    n_samples = 10000
    
    # Generate synthetic data
    np.random.seed(42)
    
    # Generate correlated features to simulate real motor behavior
    ambient = np.random.uniform(15, 35, n_samples)
    coolant = ambient - np.random.uniform(2, 8, n_samples)  # Coolant is cooler than ambient
    motor_speed = np.random.uniform(0, 3000, n_samples)
    
    # Voltage and current components with some correlation to speed
    speed_factor = motor_speed / 3000.0
    u_d = np.random.uniform(-50, 50, n_samples) * (0.5 + 0.5 * speed_factor)
    u_q = np.random.uniform(-50, 50, n_samples) * (0.5 + 0.5 * speed_factor)
    i_d = np.random.uniform(-50, 50, n_samples) * (0.5 + 0.5 * speed_factor)
    i_q = np.random.uniform(-50, 50, n_samples) * (0.5 + 0.5 * speed_factor)
    
    data = {
        'ambient': ambient,
        'coolant': coolant,
        'u_d': u_d,
        'u_q': u_q,
        'motor_speed': motor_speed,
        'i_d': i_d,
        'i_q': i_q,
    }
    
    # Generate target (pm temperature) with realistic correlations
    # Temperature increases with:
    # - Higher ambient temp
    # - Higher motor speed
    # - Higher currents (more power = more heat)
    # - Lower coolant efficiency
    
    base_temp = 20.0
    ambient_effect = 0.4 * ambient
    coolant_effect = -0.3 * coolant
    speed_effect = 0.008 * motor_speed
    current_effect = 0.2 * (np.abs(i_d) + np.abs(i_q))
    voltage_effect = 0.05 * (np.abs(u_d) + np.abs(u_q))
    
    data['pm'] = (
        base_temp +
        ambient_effect +
        coolant_effect +
        speed_effect +
        current_effect +
        voltage_effect +
        np.random.normal(0, 2, n_samples)  # Reduced noise for better R²
    )
    
    # Normalize to 0-1 range for better prediction
    data['pm'] = (data['pm'] - data['pm'].min()) / (data['pm'].max() - data['pm'].min())
    
    df = pd.DataFrame(data)
    
    # Save sample dataset
    df.to_csv('sample_dataset.csv', index=False)
    print("Sample dataset created: sample_dataset.csv")
    
    return df

def main():
    """
    Main training pipeline
    """
    print("=" * 60)
    print("Electric Motor Temperature Prediction - Model Training")
    print("=" * 60)
    
    # Try to load real dataset, otherwise create sample data
    try:
        df = load_data('dataset.csv')
    except FileNotFoundError:
        print("Dataset not found. Creating sample data...")
        df = create_sample_data()
    
    # Preprocess
    df = preprocess_data(df)
    
    # Handle outliers (excluding target column)
    feature_columns = df.columns.drop('pm')
    df = handle_outliers(df, feature_columns)
    
    # Split and scale
    X_train, X_test, y_train, y_test, scaler = split_and_scale_data(df)
    
    # Train models
    results = train_models(X_train, X_test, y_train, y_test)
    
    # Save best model
    best_model_name = save_best_model(results, scaler)
    
    print("\n" + "=" * 60)
    print("Training completed successfully!")
    print("=" * 60)
    
    # Print summary
    print("\nModel Performance Summary:")
    print("-" * 60)
    for name, result in results.items():
        marker = "✓" if name == best_model_name else " "
        print(f"{marker} {name:20s} | R²: {result['r2_score']:.4f} | RMSE: {result['rmse']:.4f}")
    print("-" * 60)

if __name__ == "__main__":
    main()
