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


/**
 * 
 * @export
 */
export const TimeBucketSize = {
    Day: 'DAY',
    Month: 'MONTH'
} as const;
export type TimeBucketSize = typeof TimeBucketSize[keyof typeof TimeBucketSize];


export function TimeBucketSizeFromJSON(json: any): TimeBucketSize {
    return TimeBucketSizeFromJSONTyped(json, false);
}

export function TimeBucketSizeFromJSONTyped(json: any, ignoreDiscriminator: boolean): TimeBucketSize {
    return json as TimeBucketSize;
}

export function TimeBucketSizeToJSON(value?: TimeBucketSize | null): any {
    return value as any;
}

