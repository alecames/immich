-- NOTE: This file is auto generated by ./sql-generator

-- ActivityRepository.search
select
  "activity".*,
  (
    select
      to_json(obj)
    from
      (
        select
          *
        from
          "users"
        where
          "users"."id" = "activity"."userId"
          and "users"."deletedAt" is null
      ) as obj
  ) as "user"
from
  "activity"
  left join "assets" on "assets"."id" = "activity"."assetId"
  and "assets"."deletedAt" is null
where
  "activity"."albumId" = $1
order by
  "activity"."createdAt" asc

-- ActivityRepository.getStatistics
select
  count(*) as "count"
from
  "activity"
  inner join "users" on "users"."id" = "activity"."userId"
  and "users"."deletedAt" is null
  left join "assets" on "assets"."id" = "activity"."assetId"
where
  "activity"."assetId" = $1
  and "activity"."albumId" = $2
  and "activity"."isLiked" = $3
  and "assets"."deletedAt" is null
