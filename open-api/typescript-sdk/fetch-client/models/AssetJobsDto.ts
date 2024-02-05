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
import type { AssetJobName } from './AssetJobName';
import {
    AssetJobNameFromJSON,
    AssetJobNameFromJSONTyped,
    AssetJobNameToJSON,
} from './AssetJobName';

/**
 * 
 * @export
 * @interface AssetJobsDto
 */
export interface AssetJobsDto {
    /**
     * 
     * @type {Array<string>}
     * @memberof AssetJobsDto
     */
    assetIds: Array<string>;
    /**
     * 
     * @type {AssetJobName}
     * @memberof AssetJobsDto
     */
    name: AssetJobName;
}

/**
 * Check if a given object implements the AssetJobsDto interface.
 */
export function instanceOfAssetJobsDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "assetIds" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function AssetJobsDtoFromJSON(json: any): AssetJobsDto {
    return AssetJobsDtoFromJSONTyped(json, false);
}

export function AssetJobsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AssetJobsDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'assetIds': json['assetIds'],
        'name': AssetJobNameFromJSON(json['name']),
    };
}

export function AssetJobsDtoToJSON(value?: AssetJobsDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'assetIds': value.assetIds,
        'name': AssetJobNameToJSON(value.name),
    };
}

