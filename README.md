# tailwind-datatable

A responsive, semantic, lightweight data table built to work with Tailwind CSS

### Intro

A good data table is an essential part of many web interfaces. I've used a fair amount of data tables in my time. This is my attempt to create a data table with the following features:

 - **Semantic**: The output of the component is semantic HTML with `<tr>` and `<td>` rather than re-implementing tables with divs.
  - **Easy styling customisation**: The datatable exclusively uses Tailwind CSS for styling and animation - its really easy to provide your own set of Tailwind classes to provide full customisation.
  - **Responsive**: Provides the option to collapse into *cards* when viewing on mobile devices.
  - **Join related columns**: Stop forcing your users to interact with data as if it is a spreadsheet, you can easily combine multiple columns (e.g. first_name, last_name and email), this makes better use of horizontal space and makes your tables stand out.
  - **CSV Export**: This is a really useful feature for internal administation tools.
  - **Fast**: This datatable can easily cope with datasets of 10,000+.
  - **Local & Remote Datasets**: There is a simple API to allow the datatable to work with remote paginated APIs with minimal boilerplate.
  - **Infinite Scroll**: Why force your users to click "next" when you don't have to - this works with both local and remote data.
  - **Advanced Filters & Search**: Tables with local data get advanced search and filters for free, remote data sources can easily be configured to use this feature also.
   - **Lightweight**: The whole datatable clocks in at under 5KB.


Full Docs available on the AddMaple site: [https://addmaple.com/open-source/tailwind-datatable](https://addmaple.com/open-source/tailwind-datatable)



