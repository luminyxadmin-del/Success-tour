
-- ============================================================
-- Luminyx Travel Kenya — Supabase Schema
-- ============================================================
-- Run this entire file in the Supabase SQL Editor.
-- Supabase Auth handles the "auth.users" table automatically;
-- this schema extends it with roles, content, and submissions.
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 0.  EXTENSIONS
-- ────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";    -- for full-text / LIKE search


-- ────────────────────────────────────────────────────────────
-- 1.  ENUM TYPES
-- ────────────────────────────────────────────────────────────
create type submission_status as enum ('new', 'contacted', 'resolved');
create type trip_type as enum (
  'Safari', 'Beach', 'Adventure', 'Family',
  'Honeymoon', 'Cultural', 'Luxury'
);
create type budget_range as enum (
  'Under $1,500 pp',
  '$1,500–$3,000 pp',
  '$3,000–$5,000 pp',
  '$5,000–$8,000 pp',
  '$8,000+ pp'
);


-- ────────────────────────────────────────────────────────────
-- 2.  ADMIN PROFILES
--     Extends Supabase Auth users with a role flag.
--     Create an admin user via Supabase Auth dashboard, then
--     INSERT a row here to grant access.
-- ────────────────────────────────────────────────────────────
create table public.admin_profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

comment on table public.admin_profiles is
  'Admins who can view/manage submissions and site content.';


-- ────────────────────────────────────────────────────────────
-- 3.  SUBMISSIONS
-- ────────────────────────────────────────────────────────────

-- 3a. Quote Requests
create table public.quote_requests (
  id                uuid primary key default uuid_generate_v4(),
  name              text    not null,
  email             text    not null,
  package_name      text    not null,
  travelers         integer not null check (travelers >= 1),
  travel_start_date date    not null,
  travel_end_date   date    not null,
  budget_range      text    not null,
  custom_budget     text,
  message           text,
  status            submission_status not null default 'new',
  admin_notes       text,
  submitted_at      timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- 3b. Package Inquiries
create table public.inquiry_submissions (
  id            uuid primary key default uuid_generate_v4(),
  name          text    not null,
  email         text    not null,
  package_name  text    not null,
  travelers          integer not null check (travelers >= 1),
  travel_start_date  date    not null,
  travel_end_date    date    not null,
  message            text,
  status             submission_status not null default 'new',
  admin_notes        text,
  submitted_at       timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- 3c. Contact Messages
create table public.contact_submissions (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  email         text not null,
  phone         text,
  subject       text not null,
  message       text not null,
  status        submission_status not null default 'new',
  admin_notes   text,
  submitted_at  timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);


-- ────────────────────────────────────────────────────────────
-- 4.  CONTENT — DESTINATIONS
-- ────────────────────────────────────────────────────────────
create table public.destinations (
  id                uuid primary key default uuid_generate_v4(),
  slug              text unique not null,
  name              text not null,
  region            text not null,
  tagline           text,
  description       text,
  long_description  text,
  image             text,             -- featured image URL
  gallery           jsonb default '[]',   -- string[]
  activities        jsonb default '[]',   -- string[]
  best_time         text,
  highlights        jsonb default '[]',   -- string[]
  is_published      boolean not null default true,
  sort_order        integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);


-- ────────────────────────────────────────────────────────────
-- 5.  CONTENT — TOUR PACKAGES
-- ────────────────────────────────────────────────────────────
create table public.packages (
  id                 uuid primary key default uuid_generate_v4(),
  slug               text unique not null,
  name               text not null,
  destination_id     uuid references public.destinations (id) on delete set null,
  destination_name   text,            -- denormalized for display speed
  locations          jsonb default '[]',   -- string[]
  duration           text,            -- e.g. "7 Days / 6 Nights"
  days               integer,
  group_size         text,
  price              numeric(10,2) not null,
  rating             numeric(3,2) default 0,
  reviews_count      integer default 0,
  trip_type          trip_type not null,
  image              text,
  gallery            jsonb default '[]',
  short_description  text,
  overview           text,
  highlights         jsonb default '[]',
  itinerary          jsonb default '[]',
  -- itinerary item shape: { day: string, title: string, description: string }
  included           jsonb default '[]',
  excluded           jsonb default '[]',
  faqs               jsonb default '[]',
  -- faq shape: { question: string, answer: string }
  next_departure     date,
  is_published       boolean not null default true,
  is_featured        boolean not null default false,
  sort_order         integer not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);


-- ────────────────────────────────────────────────────────────
-- 6.  CONTENT — SERVICES
-- ────────────────────────────────────────────────────────────
create table public.services (
  id                uuid primary key default uuid_generate_v4(),
  slug              text unique not null,
  title             text not null,
  description       text,
  long_description  text,
  icon              text,             -- Lucide icon name
  features          jsonb default '[]',   -- string[]
  is_published      boolean not null default true,
  sort_order        integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);


-- ────────────────────────────────────────────────────────────
-- 7.  CONTENT — BLOG POSTS
-- ────────────────────────────────────────────────────────────
create table public.blog_posts (
  id           uuid primary key default uuid_generate_v4(),
  slug         text unique not null,
  title        text not null,
  description  text,
  content      jsonb default '[]',   -- string[] (paragraphs)
  author       text,
  author_role  text,
  published_at date,
  read_time    text,                 -- e.g. "5 min read"
  category     text,
  image        text,
  tags         jsonb default '[]',   -- string[]
  is_published boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);


-- ────────────────────────────────────────────────────────────
-- 8.  CONTENT — TESTIMONIALS
-- ────────────────────────────────────────────────────────────
create table public.testimonials (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  role       text,
  location   text,
  quote      text not null,
  rating     integer not null check (rating between 1 and 5),
  avatar     text,
  is_active  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ────────────────────────────────────────────────────────────
-- 9.  CONTENT — TEAM MEMBERS
-- ────────────────────────────────────────────────────────────
create table public.team_members (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  role       text,
  bio        text,
  image      text,
  is_active  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ────────────────────────────────────────────────────────────
-- 10.  CONTENT — GALLERY
-- ────────────────────────────────────────────────────────────
create table public.gallery_images (
  id         uuid primary key default uuid_generate_v4(),
  src        text not null,
  category   text,
  caption    text,
  is_active  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);


-- ────────────────────────────────────────────────────────────
-- 11.  CONTENT — SITE STATS (editable hero numbers)
-- ────────────────────────────────────────────────────────────
create table public.site_stats (
  id         uuid primary key default uuid_generate_v4(),
  label      text not null,
  value      text not null,
  suffix     text,                    -- e.g. "+"
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);


-- ────────────────────────────────────────────────────────────
-- 12.  CONTENT — GLOBAL FAQS
-- ────────────────────────────────────────────────────────────
create table public.faqs (
  id         uuid primary key default uuid_generate_v4(),
  question   text not null,
  answer     text not null,
  category   text,
  sort_order integer not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ────────────────────────────────────────────────────────────
-- 13.  AUTO-UPDATE updated_at TRIGGER
-- ────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Apply to every table that has updated_at
do $$
declare
  t text;
begin
  foreach t in array array[
    'quote_requests', 'inquiry_submissions', 'contact_submissions',
    'destinations', 'packages', 'services', 'blog_posts',
    'testimonials', 'team_members', 'faqs', 'site_stats'
  ]
  loop
    execute format(
      'create trigger trg_%s_updated_at
       before update on public.%s
       for each row execute function public.set_updated_at()',
      t, t
    );
  end loop;
end;
$$;


-- ────────────────────────────────────────────────────────────
-- 14.  INDEXES
-- ────────────────────────────────────────────────────────────

-- Submissions — common filter combos
create index idx_quotes_status       on public.quote_requests         (status);
create index idx_quotes_submitted    on public.quote_requests         (submitted_at desc);
create index idx_quotes_email        on public.quote_requests         (email);

create index idx_inquiries_status    on public.inquiry_submissions    (status);
create index idx_inquiries_submitted on public.inquiry_submissions    (submitted_at desc);
create index idx_inquiries_email     on public.inquiry_submissions    (email);

create index idx_contacts_status     on public.contact_submissions    (status);
create index idx_contacts_submitted  on public.contact_submissions    (submitted_at desc);
create index idx_contacts_email      on public.contact_submissions    (email);

-- Content — slug lookups
create index idx_dest_slug     on public.destinations  (slug);
create index idx_pkg_slug      on public.packages      (slug);
create index idx_blog_slug     on public.blog_posts    (slug);
create index idx_service_slug  on public.services      (slug);

-- Packages — filter by type / destination
create index idx_pkg_trip_type on public.packages (trip_type);
create index idx_pkg_dest      on public.packages (destination_id);
create index idx_pkg_featured  on public.packages (is_featured) where is_featured;

-- Full-text search (trigram)
create index idx_pkg_name_trgm  on public.packages   using gin (name gin_trgm_ops);
create index idx_blog_title_trgm on public.blog_posts using gin (title gin_trgm_ops);
create index idx_dest_name_trgm  on public.destinations using gin (name gin_trgm_ops);


-- ────────────────────────────────────────────────────────────
-- 15.  VIEWS — ADMIN STATS DASHBOARD
-- ────────────────────────────────────────────────────────────

-- Unified view of all submissions for the admin dashboard
create or replace view public.all_submissions as
  select
    id,
    'quote'    as submission_type,
    name, email,
    null::text as subject,
    null::text as package_name,
    destination as context_label,
    status,
    submitted_at
  from public.quote_requests
  union all
  select
    id,
    'inquiry'  as submission_type,
    name, email,
    null::text as subject,
    package_name,
    package_name as context_label,
    status,
    submitted_at
  from public.inquiry_submissions
  union all
  select
    id,
    'contact'  as submission_type,
    name, email,
    subject,
    null::text as package_name,
    subject as context_label,
    status,
    submitted_at
  from public.contact_submissions;


-- Live summary stats used in the admin header cards
create or replace view public.submission_stats as
  select
    count(*)                                              as total,
    count(*) filter (where status = 'new')               as total_new,
    count(*) filter (where submitted_at::date = current_date) as today,
    count(*) filter (where submission_type = 'quote')    as quotes,
    count(*) filter (where submission_type = 'inquiry')  as inquiries,
    count(*) filter (where submission_type = 'contact')  as contacts,
    count(*) filter (where status = 'new' and submission_type = 'quote')   as new_quotes,
    count(*) filter (where status = 'new' and submission_type = 'inquiry') as new_inquiries,
    count(*) filter (where status = 'new' and submission_type = 'contact') as new_contacts
  from public.all_submissions;


-- ────────────────────────────────────────────────────────────
-- 16.  ROW LEVEL SECURITY (RLS)
-- ────────────────────────────────────────────────────────────

-- Helper function: check if the calling user is a registered admin
create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.admin_profiles
    where id = auth.uid() and is_active = true
  );
$$;

-- ── Submissions: public can INSERT, only admins can SELECT/UPDATE/DELETE ──

alter table public.quote_requests         enable row level security;
alter table public.inquiry_submissions    enable row level security;
alter table public.contact_submissions    enable row level security;

-- Anyone (including anonymous visitors) can submit
create policy "public_insert_quotes"
  on public.quote_requests for insert
  to anon, authenticated
  with check (true);

create policy "public_insert_inquiries"
  on public.inquiry_submissions for insert
  to anon, authenticated
  with check (true);

create policy "public_insert_contacts"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

-- Only admins can read/update/delete
create policy "admin_read_quotes"
  on public.quote_requests for select
  to authenticated
  using (public.is_admin());

create policy "admin_update_quotes"
  on public.quote_requests for update
  to authenticated
  using (public.is_admin());

create policy "admin_delete_quotes"
  on public.quote_requests for delete
  to authenticated
  using (public.is_admin());

create policy "admin_read_inquiries"
  on public.inquiry_submissions for select
  to authenticated
  using (public.is_admin());

create policy "admin_update_inquiries"
  on public.inquiry_submissions for update
  to authenticated
  using (public.is_admin());

create policy "admin_delete_inquiries"
  on public.inquiry_submissions for delete
  to authenticated
  using (public.is_admin());

create policy "admin_read_contacts"
  on public.contact_submissions for select
  to authenticated
  using (public.is_admin());

create policy "admin_update_contacts"
  on public.contact_submissions for update
  to authenticated
  using (public.is_admin());

create policy "admin_delete_contacts"
  on public.contact_submissions for delete
  to authenticated
  using (public.is_admin());

-- ── Content tables: public can read published rows, only admins can write ──

alter table public.destinations    enable row level security;
alter table public.packages        enable row level security;
alter table public.services        enable row level security;
alter table public.blog_posts      enable row level security;
alter table public.testimonials    enable row level security;
alter table public.team_members    enable row level security;
alter table public.gallery_images  enable row level security;
alter table public.site_stats      enable row level security;
alter table public.faqs            enable row level security;
alter table public.admin_profiles  enable row level security;

-- Public read policies (published content only)
create policy "public_read_destinations"
  on public.destinations for select
  to anon, authenticated
  using (is_published = true);

create policy "public_read_packages"
  on public.packages for select
  to anon, authenticated
  using (is_published = true);

create policy "public_read_services"
  on public.services for select
  to anon, authenticated
  using (is_published = true);

create policy "public_read_blog_posts"
  on public.blog_posts for select
  to anon, authenticated
  using (is_published = true);

create policy "public_read_testimonials"
  on public.testimonials for select
  to anon, authenticated
  using (is_active = true);

create policy "public_read_team"
  on public.team_members for select
  to anon, authenticated
  using (is_active = true);

create policy "public_read_gallery"
  on public.gallery_images for select
  to anon, authenticated
  using (is_active = true);

create policy "public_read_stats"
  on public.site_stats for select
  to anon, authenticated
  using (true);

create policy "public_read_faqs"
  on public.faqs for select
  to anon, authenticated
  using (is_active = true);

-- Admin full access to content tables
do $$
declare
  tbl text;
  op  text;
begin
  foreach tbl in array array[
    'destinations', 'packages', 'services', 'blog_posts',
    'testimonials', 'team_members', 'gallery_images',
    'site_stats', 'faqs', 'admin_profiles'
  ]
  loop
    -- SELECT / UPDATE / DELETE use USING
    foreach op in array array['select', 'update', 'delete']
    loop
      execute format(
        'create policy "admin_%s_%s"
         on public.%s for %s
         to authenticated
         using (public.is_admin())',
        op, tbl, tbl, op
      );
    end loop;

    -- INSERT uses WITH CHECK
    execute format(
      'create policy "admin_insert_%s"
       on public.%s for insert
       to authenticated
       with check (public.is_admin())',
      tbl, tbl
    );
  end loop;
end;
$$;

-- Admins can always read their own profile
create policy "admin_read_own_profile"
  on public.admin_profiles for select
  to authenticated
  using (id = auth.uid());


-- ────────────────────────────────────────────────────────────
-- 17.  SEED DATA — SITE STATS (edit values in dashboard)
-- ────────────────────────────────────────────────────────────
insert into public.site_stats (label, value, suffix, sort_order) values
  ('Happy Travelers',   '5,000', '+', 1),
  ('Safari Packages',   '50',    '+', 2),
  ('Years Experience',  '15',    '+', 3),
  ('Countries Served',  '30',    '+', 4);


-- ────────────────────────────────────────────────────────────
-- 18.  STORAGE BUCKETS  (run in Supabase dashboard or via CLI)
-- ────────────────────────────────────────────────────────────
-- The SQL API cannot create storage buckets directly.
-- Create these buckets in: Supabase Dashboard → Storage → New Bucket
--
--   Bucket name        | Public | Description
--   ─────────────────────────────────────────────────────────
--   destination-images | true   | Hero + gallery images for destinations
--   package-images     | true   | Hero + gallery images for packages
--   blog-images        | true   | Featured images for blog posts
--   team-avatars       | true   | Team member photos
--   gallery            | true   | General site gallery images
--   testimonial-avatars| true   | Customer avatar photos
--
-- Storage RLS example (apply per bucket in dashboard):
--   SELECT: true (public)
--   INSERT: (auth.uid() in (select id from public.admin_profiles))
--   UPDATE: (auth.uid() in (select id from public.admin_profiles))
--   DELETE: (auth.uid() in (select id from public.admin_profiles))


-- ────────────────────────────────────────────────────────────
-- 19.  FIRST ADMIN USER — manual step after running this file
-- ────────────────────────────────────────────────────────────
-- 1. Go to Supabase Dashboard → Authentication → Users → Invite user
--    Email: babbujamui02@gmail.com   (or your admin email)
--    Set a strong password.
--
-- 2. After the user confirms, run:
--
--    insert into public.admin_profiles (id, email, full_name)
--    values (
--      '<paste-the-user-uuid-from-auth.users>',
--      'babbujamui02@gmail.com',
--      'Admin'
--    );
--
-- That's it — the RLS policies will now grant full access.


-- ────────────────────────────────────────────────────────────
-- 20.  MIGRATIONS  (run in Supabase SQL Editor after initial setup)
-- ────────────────────────────────────────────────────────────

-- Migration 001: split travel_date into travel_start_date + travel_end_date
-- Run this block once in Supabase Dashboard → SQL Editor

alter table public.quote_requests
  rename column travel_date to travel_start_date;

alter table public.quote_requests
  add column travel_end_date date;

-- Backfill existing rows so end = start
update public.quote_requests
  set travel_end_date = travel_start_date
  where travel_end_date is null;

-- Now enforce not-null on the new column
alter table public.quote_requests
  alter column travel_end_date set not null;


-- Migration 002: split travel_date into travel_start_date + travel_end_date for inquiry_submissions
-- Run this block once in Supabase Dashboard → SQL Editor

alter table public.inquiry_submissions
  rename column travel_date to travel_start_date;

alter table public.inquiry_submissions
  alter column travel_start_date set not null;

alter table public.inquiry_submissions
  add column travel_end_date date;

-- Backfill existing rows so end = start
update public.inquiry_submissions
  set travel_end_date = travel_start_date
  where travel_end_date is null;

alter table public.inquiry_submissions
  alter column travel_end_date set not null;
