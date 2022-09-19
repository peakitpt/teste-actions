import { Section } from './../sections/section.model';
export interface EventResponse {
  results: Event[];
  total: number;
  page: number;
  limit: number;
}

export interface Event {
  accept_registrations: boolean;
  attachment: any;
  attachment_filename: any;
  content: string;
  content_type_id: number;
  contents_attachments: any[];
  contents_contents: any[];
  contents_fotogaleries: any[];
  contents_hashtags: any[];
  contents_registrations: any[];
  cover: any;
  cover_author: any;
  cover_filename: any;
  cover_locale: any;
  entity_ekklesia_location_id: number;
  event_from_date: string;
  event_from_hour: string;
  event_to_date: string;
  event_to_hour: string;
  id: number;
  limited_spaces: any;
  locale: any;
  notification_sent_at: any;
  occupied_spaces: number;
  online: boolean;
  online_from_date: string;
  online_from_hour: string;
  online_to_date: any;
  online_to_hour: any;
  registrations_end: any;
  registrations_end_hour: any;
  registrations_start: any;
  registrations_start_hour: any;
  resume: any;
  title: string;
  send_notification?: boolean;
  notification_sent_at_date?: string;
  send_scheduled_notification?: boolean;
  scheduled_notification_date_to_send?: string;
  scheduled_notification_hour_to_send?: string;
  scheduled_notification_sent_at_date?: string;
}

export interface SectionRelation {
  deleted: boolean;
  id: number;
  section: Section;
  section_id: number;
}

export interface Hashtag {
  deleted: boolean;
  id: number;
  tag: string;
}

export interface Content {
  content_rel: any;
  content_rel_description: string;
  content_rel_id: number;
  deleted: boolean;
  id: number;
}

export interface FotogaleryContent {
  attachment: string;
  attachment_filename: string;
  deleted: boolean;
  id: number;
  image_url: string;
  image_url_filename: string;
  photo_author: string;
  photo_caption: string;
}

export interface DownloadContent {
  attachment: string;
  attachment_filename: string;
  attachment_url: string;
  attachment_url_filename: string;
  deleted: boolean;
  id: number;
  link_description: string;
}
