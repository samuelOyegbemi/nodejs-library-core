# Reusable Nodejs Library

This is a repository for Reusable Nodejs library, covering authentication, response model, Error handling, validation e.t.c

## Installation

Run `npm i @wbc-nodejs/core` to install with npm or `yarn add @wbc-nodejs/core` to install with yarn

## Required Environment Variables

- APP_KEY
- APP_ENV

# Configurations
## corsOptions(config) ⇒ [<code>CorsOptions</code>](#CorsOptions)
**Kind**: global function  
**Returns**: [<code>CorsOptions</code>](#CorsOptions) - Cors Option  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | the cors configuration |
| [config.whitelist] | <code>Array.&lt;string&gt;</code> | Array of url to whitelist |
| [config.whitelistRegEx] | <code>Array.&lt;RegExp&gt;</code> | Array of url to whitelist using matching |
| config.appURL | <code>string</code> | The application url |
| [config.exposedHeaders] | <code>Array</code> | The application url |

<a name="CorsOptions"></a>

## CorsOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| credentials | <code>boolean</code> | The cors credentials. |
| exposedHeaders | <code>Array.&lt;string&gt;</code> | The headers to expose |
| origin | <code>function</code> | The origin function |

## jwtConfig
**Kind**: global constant  
**Properties**

| Name | Type |
| --- | --- |
| ACTIVATION_TOKEN_LIFESPAN | <code>string</code> | 
| SECRET_KEY | <code>string</code> | 
| ACCESS_TOKEN_LIFESPAN | <code>string</code> | 
| REFRESH_TOKEN_LIFESPAN | <code>string</code> |

## regExp
**Kind**: global constant  
**Properties**

| Name | Type |
| --- | --- |
| NUMBER | <code>RegExp</code> | 
| POSITIVE_NUMBER | <code>RegExp</code> | 
| POSITIVE_NUMBER_DECIMAL_POINT | <code>RegExp</code> | 
| EMAIL | <code>RegExp</code> | 
| PHONE_NUMBER | <code>RegExp</code> | 
| ALPHA_NUMERIC | <code>RegExp</code> | 
| ALPHA_NUMERIC_COMMA_DOT | <code>RegExp</code> | 
| ALPHA_NUMERIC_PLANE | <code>RegExp</code> | 
| PASSWORD | <code>RegExp</code> | 
| URL | <code>RegExp</code> | 
| UUID | <code>RegExp</code> |

# Error Classes
## Classes

<dl>
<dt><a href="#CustomError">CustomError</a></dt>
<dd></dd>
<dt><a href="#RequestValidationError">RequestValidationError</a></dt>
<dd></dd>
<dt><a href="#AuthenticationError">AuthenticationError</a></dt>
<dd></dd>
<dt><a href="#AuthorizationError">AuthorizationError</a></dt>
<dd></dd>
<dt><a href="#NotFoundError">NotFoundError</a></dt>
<dd></dd>
<dt><a href="#ConflictError">ConflictError</a></dt>
<dd></dd>
</dl>

<a name="CustomError"></a>

## CustomError
**Kind**: global class  
<a name="new_CustomError_new"></a>

### new CustomError(message, [config])

| Param | Type |
| --- | --- |
| message | <code>string</code> | 
| [config] | <code>Object</code> | 
| [config.httpStatusCode] | <code>number</code> | 
| [config.stackTrace] | <code>string</code> | 
| [config.subCode] | <code>number</code> | 
| [config.reason] | <code>\*</code> | 

<a name="RequestValidationError"></a>

## RequestValidationError
**Kind**: global class  
<a name="new_RequestValidationError_new"></a>

### new RequestValidationError(message, [config])

| Param | Type |
| --- | --- |
| message | <code>string</code> | 
| [config] | <code>Object</code> | 
| [config.subCode] | <code>number</code> | 
| [config.reason] | <code>\*</code> | 

<a name="AuthenticationError"></a>

## AuthenticationError
**Kind**: global class  
<a name="new_AuthenticationError_new"></a>

### new AuthenticationError(message, [config])

| Param | Type |
| --- | --- |
| message | <code>string</code> | 
| [config] | <code>Object</code> | 
| [config.subCode] | <code>number</code> | 
| [config.reason] | <code>\*</code> | 

<a name="AuthorizationError"></a>

## AuthorizationError
**Kind**: global class  
<a name="new_AuthorizationError_new"></a>

### new AuthorizationError(message, [config])

| Param | Type |
| --- | --- |
| message | <code>string</code> | 
| [config] | <code>Object</code> | 
| [config.subCode] | <code>number</code> | 
| [config.reason] | <code>\*</code> | 

<a name="NotFoundError"></a>

## NotFoundError
**Kind**: global class  
<a name="new_NotFoundError_new"></a>

### new NotFoundError(message, [config])

| Param | Type |
| --- | --- |
| message | <code>string</code> | 
| [config] | <code>Object</code> | 
| [config.subCode] | <code>number</code> | 
| [config.reason] | <code>\*</code> | 

<a name="ConflictError"></a>

## ConflictError
**Kind**: global class  
<a name="new_ConflictError_new"></a>

### new ConflictError(message, [config])

| Param | Type |
| --- | --- |
| message | <code>string</code> | 
| [config] | <code>Object</code> | 
| [config.subCode] | <code>number</code> | 
| [config.reason] | <code>\*</code> |

# Utility Functions
## Constants

<dl>
<dt><a href="#env">env</a> : <code>Object.&lt;string, *&gt;</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#isTypeOf">isTypeOf(varToCheck, type)</a> ⇒ <code>*</code> | <code>boolean</code></dt>
<dd></dd>
<dt><a href="#getDistinctFrequency">getDistinctFrequency(array)</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#getEnv">getEnv()</a> ⇒ <code>Object.&lt;string, *&gt;</code></dt>
<dd><p>get all the system environment variables</p>
</dd>
<dt><a href="#setEnv">setEnv(newEnv)</a> ⇒ <code>null</code></dt>
<dd><p>set a new environment variable or update existing one</p>
</dd>
<dt><a href="#paginate">paginate(model)</a> ⇒ <code><a href="#PaginationFunction">PaginationFunction</a></code></dt>
<dd><p>Paginates model</p>
</dd>
<dt><a href="#removeFileExtension">removeFileExtension(fileName)</a> ⇒ <code>string</code> | <code>*</code></dt>
<dd><p>To remove extension from a file</p>
</dd>
<dt><a href="#isValidBase64Image">isValidBase64Image(base64)</a> ⇒ <code>string</code> | <code>*</code></dt>
<dd><p>Check if a string is a valid base64</p>
</dd>
<dt><a href="#pickFromObject">pickFromObject(obj, acceptedKeys)</a> ⇒ <code>Object</code> | <code>*</code></dt>
<dd><p>To create a new object containing a specified key from an existing object</p>
</dd>
<dt><a href="#discardFromObject">discardFromObject(obj, forbiddenKeys)</a> ⇒ <code>Object</code> | <code>*</code></dt>
<dd><p>To create a new object that does not contain a specified key from an existing object</p>
</dd>
<dt><a href="#getBaseDomainFromUrl">getBaseDomainFromUrl(url)</a> ⇒ <code>string</code></dt>
<dd><p>To get base domain from a giving url</p>
</dd>
<dt><a href="#getCookieDomain">getCookieDomain(req)</a> ⇒ <code>string</code></dt>
<dd><p>To get cookie domain</p>
</dd>
<dt><a href="#getTokensFromRequest">getTokensFromRequest(req, [config])</a> ⇒ <code>Object</code></dt>
<dd><p>To get tokens from request</p>
</dd>
<dt><a href="#setTokensToResponse">setTokensToResponse(res, tokens, [config])</a> ⇒ <code>string</code></dt>
<dd><p>To set token to response</p>
</dd>
<dt><a href="#normalizePort">normalizePort(port)</a> ⇒ <code>boolean</code> | <code>number</code> | <code>*</code></dt>
<dd></dd>
<dt><a href="#updateQueryParams">updateQueryParams(route, params, [customIdentifier])</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#base64Encode">base64Encode(val, [urlEncode])</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#base64Decode">base64Decode(val, [urlEncoded])</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#convertToSlug">convertToSlug(text)</a> ⇒ <code>string</code> | <code>*</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#PaginationFunction">PaginationFunction</a> ⇒ <code>Object</code></dt>
<dd></dd>
</dl>

<a name="env"></a>

## env : <code>Object.&lt;string, \*&gt;</code>
**Kind**: global constant  
<a name="isTypeOf"></a>

## isTypeOf(varToCheck, type) ⇒ <code>\*</code> \| <code>boolean</code>
**Kind**: global function  
**Returns**: <code>\*</code> \| <code>boolean</code> - check - the strict type of a variable  

| Param | Type | Description |
| --- | --- | --- |
| varToCheck | <code>\*</code> | variable to check its type |
| type | <code>string</code> | The type to check against |

<a name="getDistinctFrequency"></a>

## getDistinctFrequency(array) ⇒ <code>Object</code>
**Kind**: global function  
**Returns**: <code>Object</code> - Frequency counter  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> \| <code>string</code> | The port to normalize |

<a name="getEnv"></a>

## getEnv() ⇒ <code>Object.&lt;string, \*&gt;</code>
get all the system environment variables

**Kind**: global function  
**Returns**: <code>Object.&lt;string, \*&gt;</code> - Environment variables  
<a name="setEnv"></a>

## setEnv(newEnv) ⇒ <code>null</code>
set a new environment variable or update existing one

**Kind**: global function  
**Returns**: <code>null</code> - Null  

| Param | Type | Description |
| --- | --- | --- |
| newEnv | <code>Object</code> | The new environment variable(s) as object |

<a name="paginate"></a>

## paginate(model) ⇒ [<code>PaginationFunction</code>](#PaginationFunction)
Paginates model

**Kind**: global function  
**Returns**: [<code>PaginationFunction</code>](#PaginationFunction) - Function to paginate the specified model  

| Param | Type | Description |
| --- | --- | --- |
| model | <code>Object</code> | model to add pagination to |
| [model.findAndCountAll] | <code>function</code> | inbuilt model function |

<a name="removeFileExtension"></a>

## removeFileExtension(fileName) ⇒ <code>string</code> \| <code>\*</code>
To remove extension from a file

**Kind**: global function  
**Returns**: <code>string</code> \| <code>\*</code> - Name without extension  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | The name of the file to remove its extension |

<a name="isValidBase64Image"></a>

## isValidBase64Image(base64) ⇒ <code>string</code> \| <code>\*</code>
Check if a string is a valid base64

**Kind**: global function  
**Returns**: <code>string</code> \| <code>\*</code> - If the string is base64 formatted  

| Param | Type | Description |
| --- | --- | --- |
| base64 | <code>string</code> | the base 64 string |

<a name="pickFromObject"></a>

## pickFromObject(obj, acceptedKeys) ⇒ <code>Object</code> \| <code>\*</code>
To create a new object containing a specified key from an existing object

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>\*</code> - Newly created object  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object to pick key value pair from |
| acceptedKeys | <code>Array.&lt;string&gt;</code> | the keys to pick from the object |

<a name="discardFromObject"></a>

## discardFromObject(obj, forbiddenKeys) ⇒ <code>Object</code> \| <code>\*</code>
To create a new object that does not contain a specified key from an existing object

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>\*</code> - Newly created object  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Object to create from |
| forbiddenKeys | <code>Array.&lt;string&gt;</code> | the keys that should not exist in the new object |

<a name="getBaseDomainFromUrl"></a>

## getBaseDomainFromUrl(url) ⇒ <code>string</code>
To get base domain from a giving url

**Kind**: global function  
**Returns**: <code>string</code> - The base domain  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The url to extract base domain from |

<a name="getCookieDomain"></a>

## getCookieDomain(req) ⇒ <code>string</code>
To get cookie domain

**Kind**: global function  
**Returns**: <code>string</code> - The base domain  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | Express request object |

<a name="getTokensFromRequest"></a>

## getTokensFromRequest(req, [config]) ⇒ <code>Object</code>
To get tokens from request

**Kind**: global function  
**Returns**: <code>Object</code> - Token Object  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | Express request object |
| [config] | <code>Object</code> | key to find accessToken |
| [config.accessTokenKey] | <code>string</code> | key to find accessToken |
| [config.refreshTokenKey] | <code>string</code> | key to find accessToken |

<a name="setTokensToResponse"></a>

## setTokensToResponse(res, tokens, [config]) ⇒ <code>string</code>
To set token to response

**Kind**: global function  
**Returns**: <code>string</code> - Referer Url  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>Object</code> | Express response object |
| tokens | <code>Object</code> | The tokens to set |
| [tokens.access] | <code>string</code> | The access token to set |
| [tokens.refresh] | <code>string</code> | The access token to set |
| [config] | <code>Object</code> | Other configurations |
| [config.cookieDomain] | <code>string</code> | The domain to set the token cookies on |
| [config.accessTokenKey] | <code>string</code> | The key to use for accessToken |
| [config.refreshTokenKey] | <code>string</code> | The key to use for refreshToken |
| [config.cookieLifeInDays] | <code>number</code> | The number of days before cookie expires |

<a name="normalizePort"></a>

## normalizePort(port) ⇒ <code>boolean</code> \| <code>number</code> \| <code>\*</code>
**Kind**: global function  
**Returns**: <code>boolean</code> \| <code>number</code> \| <code>\*</code> - Normalized port  

| Param | Type | Description |
| --- | --- | --- |
| port | <code>string</code> \| <code>number</code> | The port to normalize |

<a name="updateQueryParams"></a>

## updateQueryParams(route, params, [customIdentifier]) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - The updated url with the query params attached  

| Param | Type |
| --- | --- |
| route | <code>string</code> | 
| params | <code>Object</code> | 
| [customIdentifier] | <code>string</code> | 

<a name="base64Encode"></a>

## base64Encode(val, [urlEncode]) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - The encoded string  

| Param | Type |
| --- | --- |
| val | <code>\*</code> | 
| [urlEncode] | <code>boolean</code> | 

<a name="base64Decode"></a>

## base64Decode(val, [urlEncoded]) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - The decoded string  

| Param | Type |
| --- | --- |
| val | <code>\*</code> | 
| [urlEncoded] | <code>boolean</code> | 

<a name="convertToSlug"></a>

## convertToSlug(text) ⇒ <code>string</code> \| <code>\*</code>
**Kind**: global function  
**Returns**: <code>string</code> \| <code>\*</code> - slug  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

<a name="PaginationFunction"></a>

## PaginationFunction ⇒ <code>Object</code>
**Kind**: global typedef  
**Returns**: <code>Object</code> - Paginated data  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [page] | <code>string</code> \| <code>number</code> | <code>1</code> | page to query |
| [limit] | <code>string</code> \| <code>number</code> | <code>10</code> | limit for the query |
| [options] | <code>Object</code> |  | Options for the model |

# JWT Helper
## Modules

<dl>
<dt><a href="#module_jwt">jwt</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#RefreshTokenGetUser">RefreshTokenGetUser</a> ⇒ <code>Object</code></dt>
<dd><p>To get user data to be used to regenerate token</p>
</dd>
</dl>

<a name="module_jwt"></a>

## jwt

* [jwt](#module_jwt)
    * [~makeToken(user, [lifeSpan])](#module_jwt..makeToken) ⇒ <code>undefined</code> \| <code>string</code>
    * [~verifyToken(token, [includeSignature])](#module_jwt..verifyToken) ⇒ <code>Object</code>
    * [~generateTokens(user)](#module_jwt..generateTokens) ⇒ <code>Object</code>
    * [~renewAccessToken(refreshToken, getUser)](#module_jwt..renewAccessToken) ⇒ <code>Promise.&lt;Array&gt;</code>

<a name="module_jwt..makeToken"></a>

### jwt~makeToken(user, [lifeSpan]) ⇒ <code>undefined</code> \| <code>string</code>
To generate a jwt

**Kind**: inner method of [<code>jwt</code>](#module_jwt)  
**Returns**: <code>undefined</code> \| <code>string</code> - The generated token string  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>Object</code> | The user to create a token for |
| [lifeSpan] | <code>string</code> | The lifespan of the token to be created |

<a name="module_jwt..verifyToken"></a>

### jwt~verifyToken(token, [includeSignature]) ⇒ <code>Object</code>
To verify a given jwt

**Kind**: inner method of [<code>jwt</code>](#module_jwt)  
**Returns**: <code>Object</code> - the user object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| token | <code>String</code> |  | the access token string |
| [includeSignature] | <code>Boolean</code> | <code>true</code> | Whether or not to include signature |

<a name="module_jwt..generateTokens"></a>

### jwt~generateTokens(user) ⇒ <code>Object</code>
To generate both access and refresh token for a given user

**Kind**: inner method of [<code>jwt</code>](#module_jwt)  
**Returns**: <code>Object</code> - The generated token object containing access token and refresh token  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>Object</code> | The user to generate tokens for |

<a name="module_jwt..renewAccessToken"></a>

### jwt~renewAccessToken(refreshToken, getUser) ⇒ <code>Promise.&lt;Array&gt;</code>
To get new access token from a refresh token

**Kind**: inner method of [<code>jwt</code>](#module_jwt)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - The new access token and the user data  

| Param | Type | Description |
| --- | --- | --- |
| refreshToken | <code>string</code> | the refresh token |
| getUser | [<code>RefreshTokenGetUser</code>](#RefreshTokenGetUser) \| <code>function</code> | Function to get user |

<a name="RefreshTokenGetUser"></a>

## RefreshTokenGetUser ⇒ <code>Object</code>
To get user data to be used to regenerate token

**Kind**: global typedef  
**Returns**: <code>Object</code> - the user  

| Param | Type |
| --- | --- |
| id | <code>string</code> |

# App Logger
## logger
Application logger

**Kind**: global constant  
**Properties**

| Name | Type |
| --- | --- |
| stream | <code>\*</code> | 
| add | <code>function</code> | 
| info | <code>function</code> |

# Response Helper
<a name="module_response"></a>

## response

* [response](#module_response)
    * [~render(req, res, template, [data], [statusCode])](#module_response..render) ⇒ <code>HTMLDocument</code>
    * [~success(res, statusCode, [data], [message])](#module_response..success) ⇒ <code>JSON</code>
    * [~ok(res, [data], [message])](#module_response..ok) ⇒ <code>JSON</code>
    * [~created(res, data, [message])](#module_response..created) ⇒ <code>JSON</code>
    * [~redirect(res, url, [code])](#module_response..redirect) ⇒ <code>Null</code>

<a name="module_response..render"></a>

### response~render(req, res, template, [data], [statusCode]) ⇒ <code>HTMLDocument</code>
**Kind**: inner method of [<code>response</code>](#module_response)  
**Returns**: <code>HTMLDocument</code> - Full html content  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| req | <code>Object</code> |  | Express request object |
| res | <code>Object</code> |  | Express response object |
| template | <code>String</code> |  | Http status code for the response |
| [data] | <code>Object</code> |  | Data to be return as part of response body |
| [statusCode] | <code>Number</code> | <code>200</code> | Http status code for the response |

<a name="module_response..success"></a>

### response~success(res, statusCode, [data], [message]) ⇒ <code>JSON</code>
**Kind**: inner method of [<code>response</code>](#module_response)  
**Returns**: <code>JSON</code> - Formatted JSON server response  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | Express response object |
| statusCode | <code>Number</code> | Http status code for the response |
| [data] | <code>object</code> | Data to be return as part of response body |
| [message] | <code>String</code> | Message accompanying the response data |

<a name="module_response..ok"></a>

### response~ok(res, [data], [message]) ⇒ <code>JSON</code>
**Kind**: inner method of [<code>response</code>](#module_response)  
**Returns**: <code>JSON</code> - Formatted JSON server response  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | Express response object |
| [data] | <code>object</code> | Data to be return as part of response body |
| [message] | <code>String</code> | Message accompanying the response data |

<a name="module_response..created"></a>

### response~created(res, data, [message]) ⇒ <code>JSON</code>
**Kind**: inner method of [<code>response</code>](#module_response)  
**Returns**: <code>JSON</code> - Formatted JSON server response  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | Express response object |
| data | <code>object</code> | Data to be return as part of response body |
| [message] | <code>String</code> | Message accompanying the response data |

<a name="module_response..redirect"></a>

### response~redirect(res, url, [code]) ⇒ <code>Null</code>
**Kind**: inner method of [<code>response</code>](#module_response)  
**Returns**: <code>Null</code> - Null  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | Express response object |
| url | <code>String</code> | url to redirect to |
| [code] | <code>Number</code> | 301 or 302 based on permanent or temporary |

# Validators
## Objects

<dl>
<dt><a href="#validator">validator</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#CustomValidator">CustomValidator</a> ⇒ <code>*</code></dt>
<dd></dd>
<dt><a href="#CustomConfirmValidator">CustomConfirmValidator</a> ⇒ <code>*</code></dt>
<dd></dd>
<dt><a href="#CustomMatchPatterValidator">CustomMatchPatterValidator</a> ⇒ <code>*</code></dt>
<dd></dd>
<dt><a href="#CustomRequiredValidator">CustomRequiredValidator</a> ⇒ <code>Array</code></dt>
<dd></dd>
<dt><a href="#ValidatorInstance">ValidatorInstance</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="validator"></a>

## validator : <code>object</code>
**Kind**: global namespace  

* [validator](#validator) : <code>object</code>
    * [.body](#validator.body) : [<code>ValidatorInstance</code>](#ValidatorInstance)
    * [.param](#validator.param) : [<code>ValidatorInstance</code>](#ValidatorInstance)
    * [.query](#validator.query) : [<code>ValidatorInstance</code>](#ValidatorInstance)

<a name="validator.body"></a>

### validator.body : [<code>ValidatorInstance</code>](#ValidatorInstance)
**Kind**: static constant of [<code>validator</code>](#validator)  
<a name="validator.param"></a>

### validator.param : [<code>ValidatorInstance</code>](#ValidatorInstance)
**Kind**: static constant of [<code>validator</code>](#validator)  
<a name="validator.query"></a>

### validator.query : [<code>ValidatorInstance</code>](#ValidatorInstance)
**Kind**: static constant of [<code>validator</code>](#validator)  
<a name="CustomValidator"></a>

## CustomValidator ⇒ <code>\*</code>
**Kind**: global typedef  
**Returns**: <code>\*</code> - Validation chain  

| Param | Type | Description |
| --- | --- | --- |
| [fieldName] | <code>string</code> | The field to validate |
| [message] | <code>string</code> | Error message |

<a name="CustomConfirmValidator"></a>

## CustomConfirmValidator ⇒ <code>\*</code>
**Kind**: global typedef  
**Returns**: <code>\*</code> - Validation chain  

| Param | Type | Description |
| --- | --- | --- |
| [fieldName] | <code>string</code> | The field to validate |
| [benchmark] | <code>string</code> | What to benchmark against |
| [message] | <code>string</code> | Error message |

<a name="CustomMatchPatterValidator"></a>

## CustomMatchPatterValidator ⇒ <code>\*</code>
**Kind**: global typedef  
**Returns**: <code>\*</code> - Validation chain  

| Param | Type | Description |
| --- | --- | --- |
| fieldName | <code>string</code> | The field to validate |
| pattern | <code>RegExp</code> | pattern to test for |
| [message] | <code>string</code> | Error message |

<a name="CustomRequiredValidator"></a>

## CustomRequiredValidator ⇒ <code>Array</code>
**Kind**: global typedef  
**Returns**: <code>Array</code> - Validation chain  

| Param | Type | Description |
| --- | --- | --- |
| ...fieldNames | <code>string</code> | Name of the required field(s) |

<a name="ValidatorInstance"></a>

## ValidatorInstance : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| email | [<code>CustomValidator</code>](#CustomValidator) | 
| password | [<code>CustomValidator</code>](#CustomValidator) | 
| confirm | [<code>CustomConfirmValidator</code>](#CustomConfirmValidator) | 
| matchPattern | [<code>CustomMatchPatterValidator</code>](#CustomMatchPatterValidator) | 
| required | [<code>CustomRequiredValidator</code>](#CustomRequiredValidator) |

# Middlewares
<a name="decodeCurrentUser"></a>

## decodeCurrentUser([accessTokenKey], [refreshTokenKey]) ⇒ <code>function</code>
**Kind**: global function  
**Returns**: <code>function</code> - Express middleware function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [accessTokenKey] | <code>string</code> | <code>&quot;accessToken&quot;</code> | The accessToken key |
| [refreshTokenKey] | <code>string</code> | <code>&quot;refreshToken&quot;</code> | The accessToken key |

<a name="errorHandler"></a>

## errorHandler([includeStackTrace]) ⇒ <code>function</code>
**Kind**: global function  
**Returns**: <code>function</code> - Express middleware function  

| Param | Type | Description |
| --- | --- | --- |
| [includeStackTrace] | <code>boolean</code> | Whether or not to include stack trace |

<a name="requireAuthentication"></a>

## requireAuthentication([message]) ⇒ <code>function</code>
**Kind**: global function  
**Returns**: <code>function</code> - Express middleware function  

| Param | Type | Description |
| --- | --- | --- |
| [message] | <code>string</code> | The message to display to user |

<a name="preloadSwagger"></a>

## preloadSwagger(documentation) ⇒ <code>function</code>
**Kind**: global function  
**Returns**: <code>function</code> - Middleware to update documentation properties  

| Param | Type | Description |
| --- | --- | --- |
| documentation | <code>Object</code> | Swagger json documentation |

<a name="refreshAccessToken"></a>

## refreshAccessToken([config]) ⇒ <code>function</code>
**Kind**: global function  
**Returns**: <code>function</code> - Middleware to refresh accessToken  

| Param | Type | Description |
| --- | --- | --- |
| [config] | <code>Object</code> | Configuration object |
| [config.accessTokenKey] | <code>string</code> | key to find accessToken |
| [config.refreshTokenKey] | <code>string</code> | key to find refreshToken |
| [config.forceRefreshEvenIfNotExpire] | <code>boolean</code> | Whether or not to refresh even if the token has not yet expired |
| config.getUser | <code>RefreshTokenGetUser</code> | Function to get user data |

<a name="requirePrivilege"></a>

## requirePrivilege(requirements, [config]) ⇒ <code>function</code>
**Kind**: global function
**Returns**: <code>function</code> - Privilege checker middleware

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| requirements | <code>Object</code> |  | The requirements |
| [requirements.has] | <code>string</code> \| <code>function</code> |  | Checks for this privilege |
| [requirements.hasAll] | <code>Array.&lt;string&gt;</code> \| <code>function</code> |  | Checks for all privilege in this array |
| [requirements.hasAny] | <code>Array.&lt;string&gt;</code> \| <code>function</code> |  | Checks for any privilege in this array |
| [config] | <code>Object</code> |  | other configurations |
| [config.errorMessage] | <code>string</code> |  | Error message to show user in case requirement not met |
| [config.privilegeKey] | <code>string</code> | <code>&quot;privilegeList&quot;</code> | Key to check privilege list in req.user |

<a name="validationResult"></a>

## validationResult([message]) ⇒ <code>function</code>
**Kind**: global function  
**Returns**: <code>function</code> - Middleware to update documentation properties  

| Param | Type | Description |
| --- | --- | --- |
| [message] | <code>string</code> | General error message to return |
