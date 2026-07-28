export default {
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload the brand logo (shown on brands section)',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description of the brand',
    },
  ],
};
