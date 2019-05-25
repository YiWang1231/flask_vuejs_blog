from flask import jsonify, g

from app import db
from app.api import bp
from app.api.auth import basic_auth, token_auth


@bp.route('/tokens', methods=['POST'])
@basic_auth.login_required #提示Flask-HTTPAuth验证身份
def get_token():
    # 利用get_jwt获得令牌
    token = g.current_user.get_jwt()
    print(token)
    db.session.commit()
    return jsonify({'token': token})


# @bp.route('/tokens', methods=['DELETE'])
# @token_auth.login_required
# def revoke_token():
#     g.current_user.revoke_token()
#     db.session.commit()
#     return '', 404