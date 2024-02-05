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


import * as runtime from '../runtime';
import type {
  PartnerResponseDto,
  UpdatePartnerDto,
} from '../models/index';
import {
    PartnerResponseDtoFromJSON,
    PartnerResponseDtoToJSON,
    UpdatePartnerDtoFromJSON,
    UpdatePartnerDtoToJSON,
} from '../models/index';

export interface CreatePartnerRequest {
    id: string;
}

export interface GetPartnersRequest {
    direction: GetPartnersDirectionEnum;
}

export interface RemovePartnerRequest {
    id: string;
}

export interface UpdatePartnerRequest {
    id: string;
    updatePartnerDto: UpdatePartnerDto;
}

/**
 * 
 */
export class PartnerApi extends runtime.BaseAPI {

    /**
     */
    async createPartnerRaw(requestParameters: CreatePartnerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PartnerResponseDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling createPartner.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-api-key"] = this.configuration.apiKey("x-api-key"); // api_key authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/partner/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PartnerResponseDtoFromJSON(jsonValue));
    }

    /**
     */
    async createPartner(requestParameters: CreatePartnerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PartnerResponseDto> {
        const response = await this.createPartnerRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getPartnersRaw(requestParameters: GetPartnersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PartnerResponseDto>>> {
        if (requestParameters.direction === null || requestParameters.direction === undefined) {
            throw new runtime.RequiredError('direction','Required parameter requestParameters.direction was null or undefined when calling getPartners.');
        }

        const queryParameters: any = {};

        if (requestParameters.direction !== undefined) {
            queryParameters['direction'] = requestParameters.direction;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-api-key"] = this.configuration.apiKey("x-api-key"); // api_key authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/partner`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PartnerResponseDtoFromJSON));
    }

    /**
     */
    async getPartners(requestParameters: GetPartnersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PartnerResponseDto>> {
        const response = await this.getPartnersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async removePartnerRaw(requestParameters: RemovePartnerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling removePartner.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-api-key"] = this.configuration.apiKey("x-api-key"); // api_key authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/partner/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async removePartner(requestParameters: RemovePartnerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.removePartnerRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updatePartnerRaw(requestParameters: UpdatePartnerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PartnerResponseDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updatePartner.');
        }

        if (requestParameters.updatePartnerDto === null || requestParameters.updatePartnerDto === undefined) {
            throw new runtime.RequiredError('updatePartnerDto','Required parameter requestParameters.updatePartnerDto was null or undefined when calling updatePartner.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-api-key"] = this.configuration.apiKey("x-api-key"); // api_key authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/partner/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdatePartnerDtoToJSON(requestParameters.updatePartnerDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PartnerResponseDtoFromJSON(jsonValue));
    }

    /**
     */
    async updatePartner(requestParameters: UpdatePartnerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PartnerResponseDto> {
        const response = await this.updatePartnerRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const GetPartnersDirectionEnum = {
    By: 'shared-by',
    With: 'shared-with'
} as const;
export type GetPartnersDirectionEnum = typeof GetPartnersDirectionEnum[keyof typeof GetPartnersDirectionEnum];
