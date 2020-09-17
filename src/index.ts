import fetch from "cross-fetch";
import { Buffer } from "buffer";
import { URLSearchParams } from "url";
import { createAuthLink, AuthOptions } from "aws-appsync-auth-link";
import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
/** @internal */
type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;
/** @internal */
async function getAccessToken({
  tokenEndpoint,
  clientId,
  clientSecret,
  scope,
}: {
  tokenEndpoint: string;
  clientId: string;
  clientSecret: string;
  scope: string;
}) {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("scope", scope);
  params.append("client_id", clientId);
  params.append("state", "abcdefg");
  const fetchParams = {
    method: "POST",
    body: params,
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "*/*",
    },
  };
  const results = await fetch(tokenEndpoint, fetchParams);
  if (results.status !== 200)
    throw new Error(`${results.status}: ${results.statusText}`);
  const { access_token, token_type, expires_in } = await results.json();
  return { access_token, token_type, expires_in };
}
/** @internal */
function makeAppSyncClient({
  graphqlEndpoint: url,
  region = "us-east-1",
  access_token,
}: {
  graphqlEndpoint: string;
  region: string;
  access_token: string;
}) {
  const config = {
    fetch,
    url,
    region,
    auth: <AuthOptions>{
      type: "AMAZON_COGNITO_USER_POOLS",
      jwtToken: async () => access_token,
    },
  };
  //@NOTE: Order matters - HTTP Link must be after AuthLink
  const client = new ApolloClient({
    link: ApolloLink.from([
      createAuthLink(config),
      createHttpLink({
        uri: url,
        fetch,
      }),
    ]),
    cache: new InMemoryCache(),
  });

  return client;
}
/** @internal */
async function makeToken({
  tokenEndpoint,
  clientId,
  clientSecret,
}: {
  tokenEndpoint: string;
  clientId: string;
  clientSecret: string;
}) {
  return await getAccessToken({
    tokenEndpoint,
    clientId,
    clientSecret,
    scope: "firm-access/gql",
  });
}
/** @internal  */
type AccessObject = {
  tokenEndpoint: string;
  clientSecret: string;
  clientId: string;
  graphqlEndpoint: string;
  region: string;
};
/** @internal */
let cachedToken: string | AccessObject = "";
/** @internal */
let client: ReturnType<typeof makeAppSyncClient> | undefined;
/**
 * Account relationship
 * @param token token for setting up account access
 */
export async function init(token: string | AccessObject | undefined) {
  if (!token) {
    if (!client)
      throw new Error(
        "Cannot authenticate because no token and no cached client."
      );
    return client;
  }
  if (typeof client !== "undefined" && token === cachedToken) return client;
  if (typeof token === "string") {
    token = <AccessObject>(
      JSON.parse(Buffer.from(token, "base64").toString("utf8"))
    );
  }
  const {
    tokenEndpoint,
    clientSecret,
    clientId,
    graphqlEndpoint,
    region,
  } = token;
  const { access_token } = await makeToken({
    tokenEndpoint,
    clientId,
    clientSecret,
  });
  client = makeAppSyncClient({
    graphqlEndpoint,
    access_token,
    region,
  });
  return client;
}
