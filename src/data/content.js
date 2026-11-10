// Operational constants for MeriHaat. All customer-facing copy (overnight steps, promises,
// testimonials, city and slot names) lives in src/i18n/locales/*.json.
// SAMPLE CONTENT: the testimonials in the locale files are illustrative placeholders,
// not real customers. Replace with genuine reviews before launch.

export const DELIVERY = {
  cutoffHour: 23, // orders placed before 11 PM go out next morning
  freeAbove: 399,
  fee: 30,
  slots: ['6-7', '7-8', '8-9'], // labels: slots.<id>
};

// Ids for the delivery areas; display names: cities.<id>
export const CITIES = ['west-delhi', 'gurugram', 'south-delhi', 'noida', 'faridabad', 'ghaziabad'];

// The night shift, in clock times; titles and bodies: overnight.steps[i]
export const OVERNIGHT = [
  { time: '11:00', meridiem: 'pm' },
  { time: '02:30', meridiem: 'am' },
  { time: '04:00', meridiem: 'am' },
  { time: '05:30', meridiem: 'am' },
  { time: '07:00', meridiem: 'am' },
];
