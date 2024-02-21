import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutInfoBlock extends Schema.Component {
  collectionName: 'components_about_info_blocks';
  info: {
    displayName: 'Info block';
    description: '';
    icon: 'information';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
  };
}

export interface PageMeta extends Schema.Component {
  collectionName: 'components_page_metas';
  info: {
    displayName: 'Meta';
    icon: 'code';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about.info-block': AboutInfoBlock;
      'page.meta': PageMeta;
    }
  }
}
