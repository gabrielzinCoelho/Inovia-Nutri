export const FetchConsultationstApiResponse = {
  status: 200,
  description: 'Consultas buscadas com sucesso.',
  schema: {
    example: {
      consultations: [
        {
          _id: '6769d0a8eab16deaf2a7ffbd',
          start_time: '2024-12-29T21:05:00.000Z',
          end_time: '2024-12-29T22:05:00.000Z',
          nutritionist: {
            _id: '6769b7004ab000bd0e461579',
            name: 'Richard Stoltenberg',
          },
          client: {
            _id: '6769b7014ab000bd0e461585',
            name: 'Dr. Malcolm Schmidt',
          },
          recurrence_interval: 7,
          recurrence_end_time: '2025-01-16T23:59:59.999Z',
          __v: 0,
        },
      ],
    },
  },
}
