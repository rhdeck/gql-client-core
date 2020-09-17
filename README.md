
<a name="readmemd"></a>



<a name="_librarymd"></a>

[@raydeck/gql-client-core - v1.0.2](#readmemd)

# @raydeck/gql-client-core - v1.0.2

## Index

### Type aliases

* [AccessObject](#accessobject)
* [Await](#await)

### Variables

* [cachedToken](#let-cachedtoken)
* [client](#let-client)

### Functions

* [getAccessToken](#getaccesstoken)
* [init](#init)
* [makeAppSyncClient](#makeappsyncclient)
* [makeToken](#maketoken)

## Type aliases

###  AccessObject

Ƭ **AccessObject**: *object*

*Defined in [index.ts:100](https://github.com/rhdeck/gql-client-core/blob/91bb3e2/src/index.ts#L100)*

**`internal`** 

#### Type declaration:

* **clientId**: *string*

* **clientSecret**: *string*

* **graphqlEndpoint**: *string*

* **region**: *string*

* **tokenEndpoint**: *string*

___

###  Await

Ƭ **Await**: *T extends object ? U : T*

*Defined in [index.ts:10](https://github.com/rhdeck/gql-client-core/blob/91bb3e2/src/index.ts#L10)*

**`internal`** 

## Variables

### `Let` cachedToken

• **cachedToken**: *string | [AccessObject](#accessobject)* = ""

*Defined in [index.ts:108](https://github.com/rhdeck/gql-client-core/blob/91bb3e2/src/index.ts#L108)*

**`internal`** 

___

### `Let` client

• **client**: *ReturnType‹typeof makeAppSyncClient› | undefined*

*Defined in [index.ts:110](https://github.com/rhdeck/gql-client-core/blob/91bb3e2/src/index.ts#L110)*

**`internal`** 

## Functions

###  getAccessToken

▸ **getAccessToken**(`__namedParameters`: object): *Promise‹object›*

*Defined in [index.ts:16](https://github.com/rhdeck/gql-client-core/blob/91bb3e2/src/index.ts#L16)*

**`internal`** 

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`clientId` | string |
`clientSecret` | string |
`scope` | string |
`tokenEndpoint` | string |

**Returns:** *Promise‹object›*

___

###  init

▸ **init**(`token`: string | [AccessObject](#accessobject) | undefined): *Promise‹ApolloClient‹NormalizedCacheObject››*

*Defined in [index.ts:115](https://github.com/rhdeck/gql-client-core/blob/91bb3e2/src/index.ts#L115)*

Account relationship

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`token` | string &#124; [AccessObject](#accessobject) &#124; undefined | token for setting up account access  |

**Returns:** *Promise‹ApolloClient‹NormalizedCacheObject››*

___

###  makeAppSyncClient

▸ **makeAppSyncClient**(`__namedParameters`: object): *ApolloClient‹NormalizedCacheObject›*

*Defined in [index.ts:50](https://github.com/rhdeck/gql-client-core/blob/91bb3e2/src/index.ts#L50)*

**`internal`** 

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`access_token` | string | - |
`region` | string | "us-east-1" |
`url` | string | - |

**Returns:** *ApolloClient‹NormalizedCacheObject›*

___

###  makeToken

▸ **makeToken**(`__namedParameters`: object): *Promise‹object›*

*Defined in [index.ts:83](https://github.com/rhdeck/gql-client-core/blob/91bb3e2/src/index.ts#L83)*

**`internal`** 

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`clientId` | string |
`clientSecret` | string |
`tokenEndpoint` | string |

**Returns:** *Promise‹object›*
