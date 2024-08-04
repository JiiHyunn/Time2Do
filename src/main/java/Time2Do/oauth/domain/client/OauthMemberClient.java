package Time2Do.oauth.domain.client;

import Time2Do.oauth.domain.OauthMember;
import Time2Do.oauth.domain.OauthServerType;

public interface OauthMemberClient {

    OauthServerType supportServer();

    OauthMember fetch(String code);
}