import requests
from flask import Blueprint, jsonify, request

audius_bp = Blueprint('audius', __name__)
AUDIUS_API_BASE = "https://discoveryprovider3.audius.co/v1"


def fetch_from_audius(endpoint, params={}):
    try:
        res = requests.get(f"{AUDIUS_API_BASE}/{endpoint}", params=params)
        res.raise_for_status()
        return res.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}, 500

@audius_bp.route('/trending', methods=['GET'])
def get_trending():
    genre = request.args.get('genre', None)
    limit = request.args.get('limit', 10)

    params = {'limit': limit}
    if genre:
        params['genre'] = genre

    data = fetch_from_audius('tracks/trending', params)

    if isinstance(data, tuple):  # Error response
        return jsonify(data[0]), data[1]
    
    return jsonify(data)


@audius_bp.route('/genre/<genre_name>', methods=['GET'])
def get_genre_tracks(genre_name):
    params = {'genre': genre_name, 'limit': request.args.get('limit', 42)}
    data = fetch_from_audius('tracks/trending', params)

    if isinstance(data, tuple):
        return jsonify(data[0]), data[1]

    return jsonify(data)


@audius_bp.route('/search', methods=['GET'])
def search_tracks():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'Missing query parameter'}), 400
    params = {'query': query, 'limit': request.args.get('limit', 10)}
    data = fetch_from_audius('tracks/search', params)
    return jsonify(data)

@audius_bp.route('/stream/<track_id>', methods=['GET'])
def get_stream_url(track_id):
    stream_url = f"{AUDIUS_API_BASE}/tracks/{track_id}/stream"
    return jsonify({"stream_url": stream_url})


