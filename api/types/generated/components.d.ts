import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutInfoBlock extends Schema.Component {
  collectionName: 'components_about_info_blocks';
  info: {
    displayName: 'Info block';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.RichText & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about.info-block': AboutInfoBlock;
    }
  }
}
