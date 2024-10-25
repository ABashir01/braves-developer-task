from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)

CORS(app)

@app.route('/')
def home():
    return "Hello!"

def query_batter_data(batter_name):
    conn = sqlite3.connect('./data/BattedBallData.db') 
    cursor = conn.cursor()
    query = '''SELECT * FROM Data WHERE BATTER = ?'''
    cursor.execute(query, (batter_name,))
    records = cursor.fetchall()
    conn.close()
    
    return records


# GET route to get records for a specific batter
@app.route('/batter', methods=['GET'])
def get_batter_data():
    batter_name = request.args.get('batter')

    if not batter_name:
        return jsonify({"error": "No batter name provided"}), 400
    
    batter_data = query_batter_data(batter_name)
    
    if batter_data:
        return jsonify({"batter": batter_name, "data": batter_data}), 200
    else:
        return jsonify({"message": f"No data found for batter {batter_name}"}), 404
    
# GET route to get all batters in the database
@app.route('/batters', methods=['GET'])
def get_batters():
    conn = sqlite3.connect('./data/BattedBallData.db')
    cursor = conn.cursor()

    query = '''SELECT DISTINCT BATTER FROM Data'''

    cursor.execute(query)

    batters = cursor.fetchall()

    conn.close()

    batter_names = [batter[0] for batter in batters]

    return jsonify({"batters": batter_names}), 200

if __name__ == '__main__':
    app.run(debug=True)
