-- NOTE: This file is auto generated by ./sql-generator

-- AssetRepository.getByDayOfYear
with
  "res" as (
    with
      "today" as (
        select
          make_date(year::int, $1::int, $2::int) as "date"
        from
          generate_series(
            (
              select
                date_part(
                  'year',
                  min(("localDateTime" at time zone 'UTC')::date)
                )::int
              from
                assets
            ),
            date_part('year', current_date)::int - 1
          ) as "year"
      )
    select
      "a".*,
      to_jsonb("exif") as "exifInfo"
    from
      "today"
      inner join lateral (
        select
          "assets".*
        from
          "assets"
          inner join "asset_job_status" on "assets"."id" = "asset_job_status"."assetId"
        where
          "asset_job_status"."previewAt" is not null
          and (assets."localDateTime" at time zone 'UTC')::date = today.date
          and "assets"."ownerId" = any ($3::uuid [])
          and "assets"."isVisible" = $4
          and "assets"."isArchived" = $5
          and exists (
            select
            from
              "asset_files"
            where
              "assetId" = "assets"."id"
              and "asset_files"."type" = $6
          )
          and "assets"."deletedAt" is null
        limit
          $7
      ) as "a" on true
      inner join "exif" on "a"."id" = "exif"."assetId"
  )
select
  (
    (now() at time zone 'UTC')::date - ("localDateTime" at time zone 'UTC')::date
  ) / 365 as "yearsAgo",
  jsonb_agg("res") as "assets"
from
  "res"
group by
  ("localDateTime" at time zone 'UTC')::date
order by
  ("localDateTime" at time zone 'UTC')::date desc
limit
  $8

-- AssetRepository.getByIds
select
  "assets".*
from
  "assets"
where
  "assets"."id" = any ($1::uuid [])

-- AssetRepository.getByIdsWithAllRelations
select
  "assets".*,
  (
    select
      jsonb_agg(
        case
          when "person"."id" is not null then jsonb_insert(
            to_jsonb("asset_faces"),
            '{person}'::text[],
            to_jsonb("person")
          )
          else to_jsonb("asset_faces")
        end
      ) as "faces"
    from
      "asset_faces"
      left join "person" on "person"."id" = "asset_faces"."personId"
    where
      "asset_faces"."assetId" = "assets"."id"
  ) as "faces",
  (
    select
      coalesce(json_agg(agg), '[]')
    from
      (
        select
          "tags".*
        from
          "tags"
          inner join "tag_asset" on "tags"."id" = "tag_asset"."tagsId"
        where
          "assets"."id" = "tag_asset"."assetsId"
      ) as agg
  ) as "tags",
  to_jsonb("exif") as "exifInfo",
  to_jsonb("stacked_assets") as "stack"
from
  "assets"
  left join "exif" on "assets"."id" = "exif"."assetId"
  left join lateral (
    select
      "asset_stack".*,
      "s"."assets"
    from
      "asset_stack"
      inner join lateral (
        select
          array_agg("stacked") as "assets"
        from
          "assets" as "stacked"
        where
          "asset_stack"."id" = "stacked"."stackId"
          and "asset_stack"."primaryAssetId" != "stacked"."id"
      ) as "s" on (
        "asset_stack"."primaryAssetId" = "assets"."id"
        or "assets"."stackId" is null
      )
    where
      "assets"."stackId" = "asset_stack"."id"
  ) as "stacked_assets" on true
where
  "assets"."id" = any ($1::uuid [])

-- AssetRepository.deleteAll
delete from "assets"
where
  "ownerId" = $1

-- AssetRepository.getByLibraryIdAndOriginalPath
select
  "assets".*
from
  "assets"
where
  "libraryId" = $1::uuid
  and "originalPath" = $2
limit
  $3

-- AssetRepository.getAllByDeviceId
select
  "deviceAssetId"
from
  "assets"
where
  "ownerId" = $1::uuid
  and "deviceId" = $2
  and "isVisible" = $3
  and "deletedAt" is null

-- AssetRepository.getLivePhotoCount
select
  count(*) as "count"
from
  "assets"
where
  "livePhotoVideoId" = $1::uuid

-- AssetRepository.getById
select
  "assets".*
from
  "assets"
where
  "assets"."id" = $1::uuid
limit
  $2

-- AssetRepository.updateAll
update "assets"
set
  "deviceId" = $1
where
  "id" = any ($2::uuid [])

-- AssetRepository.updateDuplicates
update "assets"
set
  "duplicateId" = $1
where
  (
    "duplicateId" = any ($2::uuid [])
    or "id" = any ($3::uuid [])
  )

-- AssetRepository.getByChecksum
select
  "assets".*
from
  "assets"
where
  "ownerId" = $1::uuid
  and "checksum" = $2
  and "libraryId" = $3::uuid
limit
  $4

-- AssetRepository.getByChecksums
select
  "id",
  "checksum",
  "deletedAt"
from
  "assets"
where
  "ownerId" = $1::uuid
  and "checksum" in ($2)

-- AssetRepository.getUploadAssetIdByChecksum
select
  "id"
from
  "assets"
where
  "ownerId" = $1::uuid
  and "checksum" = $2
  and "libraryId" is null
limit
  $3

-- AssetRepository.getWithout (sidecar)
select
  "assets".*
from
  "assets"
where
  (
    "assets"."sidecarPath" = $1
    or "assets"."sidecarPath" is null
  )
  and "assets"."isVisible" = $2
  and "deletedAt" is null
order by
  "createdAt"
limit
  $3
offset
  $4

-- AssetRepository.getTimeBuckets
with
  "assets" as (
    select
      date_trunc($1, "localDateTime" at time zone 'UTC') at time zone 'UTC' as "timeBucket"
    from
      "assets"
    where
      "assets"."deletedAt" is null
      and "assets"."isVisible" = $2
  )
select
  "timeBucket",
  count(*) as "count"
from
  "assets"
group by
  "timeBucket"
order by
  "timeBucket" desc

-- AssetRepository.getTimeBucket
select
  "assets".*,
  to_jsonb("exif") as "exifInfo"
from
  "assets"
  left join "exif" on "assets"."id" = "exif"."assetId"
where
  "assets"."deletedAt" is null
  and "assets"."isVisible" = $1
  and date_trunc($2, "localDateTime" at time zone 'UTC') at time zone 'UTC' = $3
order by
  "assets"."localDateTime" desc

-- AssetRepository.getDuplicates
with
  "duplicates" as (
    select
      "duplicateId",
      jsonb_agg("assets") as "assets"
    from
      "assets"
    where
      "ownerId" = $1::uuid
      and "duplicateId" is not null
      and "deletedAt" is null
      and "isVisible" = $2
    group by
      "duplicateId"
  ),
  "unique" as (
    select
      "duplicateId"
    from
      "duplicates"
    where
      jsonb_array_length("assets") = $3
  ),
  "removed_unique" as (
    update "assets"
    set
      "duplicateId" = $4
    from
      "unique"
    where
      "assets"."duplicateId" = "unique"."duplicateId"
  )
select
  *
from
  "duplicates"
where
  not exists (
    select
    from
      "unique"
    where
      "unique"."duplicateId" = "duplicates"."duplicateId"
  )

-- AssetRepository.getAssetIdByCity
with
  "cities" as (
    select
      "city"
    from
      "exif"
    where
      "city" is not null
    group by
      "city"
    having
      count("assetId") >= $1
  )
select distinct
  on ("exif"."city") "assetId" as "data",
  "exif"."city" as "value"
from
  "assets"
  inner join "exif" on "assets"."id" = "exif"."assetId"
  inner join "cities" on "exif"."city" = "cities"."city"
where
  "ownerId" = $2::uuid
  and "isVisible" = $3
  and "isArchived" = $4
  and "type" = $5
  and "deletedAt" is null
limit
  $6

-- AssetRepository.getAllForUserFullSync
select
  "assets".*,
  to_jsonb("exif") as "exifInfo",
  to_jsonb("stacked_assets") as "stack"
from
  "assets"
  left join "exif" on "assets"."id" = "exif"."assetId"
  left join lateral (
    select
      "asset_stack".*,
      (
        select
          count(*) as "assetCount"
        where
          "asset_stack"."id" = "assets"."stackId"
      ) as "assetCount"
    from
      "asset_stack"
    where
      "assets"."stackId" = "asset_stack"."id"
  ) as "stacked_assets" on true
where
  "assets"."ownerId" = $1::uuid
  and "isVisible" = $2
  and "updatedAt" <= $3
  and "assets"."id" > $4
order by
  "assets"."id"
limit
  $5

-- AssetRepository.getChangedDeltaSync
select
  "assets".*,
  to_jsonb("exif") as "exifInfo",
  to_jsonb("stacked_assets") as "stack"
from
  "assets"
  left join "exif" on "assets"."id" = "exif"."assetId"
  left join lateral (
    select
      "asset_stack".*,
      (
        select
          count(*) as "assetCount"
        where
          "asset_stack"."id" = "assets"."stackId"
      ) as "assetCount"
    from
      "asset_stack"
    where
      "assets"."stackId" = "asset_stack"."id"
  ) as "stacked_assets" on true
where
  "assets"."ownerId" = any ($1::uuid [])
  and "isVisible" = $2
  and "updatedAt" > $3
limit
  $4
