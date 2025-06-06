from flask import Blueprint, jsonify, request
import requests
from flask_cors import CORS

deezer_bp = Blueprint('deezer', __name__)
CORS(deezer_bp)  # Enable CORS for this blueprint

DEEZER_API_BASE = 'https://api.deezer.com'
GHANA_EDITORIAL_ID = 132  # Ghana-specific charts

@deezer_bp.route('/trending', methods=['GET'])
def get_trending():
    try:
        response = requests.get(f'{DEEZER_API_BASE}/editorial/{GHANA_EDITORIAL_ID}/charts')
        response.raise_for_status()
        data = response.json()
        return jsonify({
            'tracks': data.get('tracks', {}).get('data', []),
            'artists': data.get('artists', {}).get('data', []),
            'playlists': data.get('playlists', {}).get('data', [])
        })
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Failed to fetch trending data: {str(e)}'}), 500

@deezer_bp.route('/search', methods=['GET'])
def search():
    query = request.args.get('q')
    limit = min(int(request.args.get('limit', 25)), 100)  # Default 25, max 100
    
    if not query:
        return jsonify({'error': 'Search query is required'}), 400

    try:
        # Build Deezer API URL
        url = f"{DEEZER_API_BASE}/search"
        params = {
            'q': query,
            'limit': limit
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        # Return Deezer's response directly (it already has 'data' array)
        return jsonify(response.json())
        
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Search failed: {str(e)}'}), 500

@deezer_bp.route('/<resource_type>/<int:resource_id>', methods=['GET'])
def get_resource(resource_type, resource_id):
    valid_resources = ['album', 'artist', 'track', 'playlist', 'user']
    
    if resource_type not in valid_resources:
        return jsonify({'error': 'Invalid resource type'}), 400

    try:
        response = requests.get(f'{DEEZER_API_BASE}/{resource_type}/{resource_id}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Failed to fetch {resource_type}: {str(e)}'}), 500
    

@deezer_bp.route('/genres', methods=['GET'])
def get_genres():
    try:
        response = requests.get(f'{DEEZER_API_BASE}/genre')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Failed to fetch genres: {str(e)}'}), 500


@deezer_bp.route('/playlist/<int:playlist_id>', methods=['GET'])
def get_playlist_tracks(playlist_id):
    try:
        response = requests.get(f'{DEEZER_API_BASE}/playlist/{playlist_id}')
        response.raise_for_status()
        data = response.json()

        return jsonify({
            'id': data.get('id'),
            'title': data.get('title'),
            'description': data.get('description'),
            'creator': data.get('creator', {}),
            'tracks': data.get('tracks', {}).get('data', []),
            'picture': data.get('picture'),
            'duration': data.get('duration')
        })
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Failed to fetch playlist: {str(e)}'}), 500
