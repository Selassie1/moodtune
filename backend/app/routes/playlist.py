@playlist_bp.route('/create', methods=['POST'])
def create_playlist():
    data = request.get_json()
    user_id = data.get('user_id')  # username
    name = data.get('name')

    if not user_id or not name:
        return jsonify({'error': 'Missing user_id or playlist name'}), 400

    # Optional: check if user exists
    from app.models.user import User
    if not User.query.get(user_id):
        return jsonify({'error': 'User not found'}), 404

    playlist = Playlist(name=name, user_id=user_id)
    db.session.add(playlist)
    db.session.commit()
    return jsonify({'message': 'Playlist created', 'playlist_id': playlist.id}), 201

@playlist_bp.route('/playlists', methods=['GET'])
def get_playlists():
    playlists = Playlist.query.all()
    return jsonify([
        {'id': p.id, 'name': p.name, 'user_id': p.user_id}
        for p in playlists
    ])
