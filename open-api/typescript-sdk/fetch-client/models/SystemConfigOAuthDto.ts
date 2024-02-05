/* tslint:disable */
/* eslint-disable */
/**
 * Immich
 * Immich API
 *
 * The version of the OpenAPI document: 1.94.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface SystemConfigOAuthDto
 */
export interface SystemConfigOAuthDto {
    /**
     * 
     * @type {boolean}
     * @memberof SystemConfigOAuthDto
     */
    autoLaunch: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SystemConfigOAuthDto
     */
    autoRegister: boolean;
    /**
     * 
     * @type {string}
     * @memberof SystemConfigOAuthDto
     */
    buttonText: string;
    /**
     * 
     * @type {string}
     * @memberof SystemConfigOAuthDto
     */
    clientId: string;
    /**
     * 
     * @type {string}
     * @memberof SystemConfigOAuthDto
     */
    clientSecret: string;
    /**
     * 
     * @type {boolean}
     * @memberof SystemConfigOAuthDto
     */
    enabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof SystemConfigOAuthDto
     */
    issuerUrl: string;
    /**
     * 
     * @type {boolean}
     * @memberof SystemConfigOAuthDto
     */
    mobileOverrideEnabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof SystemConfigOAuthDto
     */
    mobileRedirectUri: string;
    /**
     * 
     * @type {string}
     * @memberof SystemConfigOAuthDto
     */
    scope: string;
    /**
     * 
     * @type {string}
     * @memberof SystemConfigOAuthDto
     */
    signingAlgorithm: string;
    /**
     * 
     * @type {string}
     * @memberof SystemConfigOAuthDto
     */
    storageLabelClaim: string;
}

/**
 * Check if a given object implements the SystemConfigOAuthDto interface.
 */
export function instanceOfSystemConfigOAuthDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "autoLaunch" in value;
    isInstance = isInstance && "autoRegister" in value;
    isInstance = isInstance && "buttonText" in value;
    isInstance = isInstance && "clientId" in value;
    isInstance = isInstance && "clientSecret" in value;
    isInstance = isInstance && "enabled" in value;
    isInstance = isInstance && "issuerUrl" in value;
    isInstance = isInstance && "mobileOverrideEnabled" in value;
    isInstance = isInstance && "mobileRedirectUri" in value;
    isInstance = isInstance && "scope" in value;
    isInstance = isInstance && "signingAlgorithm" in value;
    isInstance = isInstance && "storageLabelClaim" in value;

    return isInstance;
}

export function SystemConfigOAuthDtoFromJSON(json: any): SystemConfigOAuthDto {
    return SystemConfigOAuthDtoFromJSONTyped(json, false);
}

export function SystemConfigOAuthDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SystemConfigOAuthDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'autoLaunch': json['autoLaunch'],
        'autoRegister': json['autoRegister'],
        'buttonText': json['buttonText'],
        'clientId': json['clientId'],
        'clientSecret': json['clientSecret'],
        'enabled': json['enabled'],
        'issuerUrl': json['issuerUrl'],
        'mobileOverrideEnabled': json['mobileOverrideEnabled'],
        'mobileRedirectUri': json['mobileRedirectUri'],
        'scope': json['scope'],
        'signingAlgorithm': json['signingAlgorithm'],
        'storageLabelClaim': json['storageLabelClaim'],
    };
}

export function SystemConfigOAuthDtoToJSON(value?: SystemConfigOAuthDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'autoLaunch': value.autoLaunch,
        'autoRegister': value.autoRegister,
        'buttonText': value.buttonText,
        'clientId': value.clientId,
        'clientSecret': value.clientSecret,
        'enabled': value.enabled,
        'issuerUrl': value.issuerUrl,
        'mobileOverrideEnabled': value.mobileOverrideEnabled,
        'mobileRedirectUri': value.mobileRedirectUri,
        'scope': value.scope,
        'signingAlgorithm': value.signingAlgorithm,
        'storageLabelClaim': value.storageLabelClaim,
    };
}

