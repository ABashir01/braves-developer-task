from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)

CORS(app)

@app.route('/')
def home():
    return "Hello!"

# Function to query the database and return records for a specific batter
def query_batter_data(batter_name):
    # Connect to the SQLite database
    conn = sqlite3.connect('./data/BattedBallData.db') 
    cursor = conn.cursor()

    # Query to get all records for the given batter
    query = '''SELECT * FROM Data WHERE BATTER = ?'''
    
    cursor.execute(query, (batter_name,))
    
    # Fetch all records that match the batter's name
    records = cursor.fetchall()
    
    # Close the connection
    conn.close()
    
    return records


# API route to get records for a specific batter
@app.route('/batter', methods=['GET'])
def get_batter_data():
    # Get the batter's name from the query string
    batter_name = request.args.get('batter')

    # Check if the batter's name is provided
    if not batter_name:
        return jsonify({"error": "No batter name provided"}), 400
    
    # Query the database for records corresponding to the batter
    batter_data = query_batter_data(batter_name)
    
    # Return the data as JSON
    if batter_data:
        return jsonify({"batter": batter_name, "data": batter_data}), 200
    else:
        return jsonify({"message": f"No data found for batter {batter_name}"}), 404
    
# API route to get all batters in the database
@app.route('/batters', methods=['GET'])
def get_batters():
    # Connect to the SQLite database
    conn = sqlite3.connect('./data/BattedBallData.db')
    cursor = conn.cursor()

    # Query to get all unique batters in the database
    query = '''SELECT DISTINCT BATTER FROM Data'''

    cursor.execute(query)

    # Fetch all unique batters
    batters = cursor.fetchall()

    # Close the connection
    conn.close()

    # Extract the batter names from the list of tuples
    batter_names = [batter[0] for batter in batters]

    return jsonify({"batters": batter_names}), 200

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
