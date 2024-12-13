export const FetchConsultationstApiResponse = {
  status: 200,
  description: 'Consultas buscadas com sucesso.',
  schema: {
    example: {
      consultations: [
        {
          _id: '675cc10ac5464c094652f75f',
          start_time: '2024-12-13T20:30:00.000Z',
          end_time: '2024-12-13T21:00:00.000Z',
          nutritionist: '675cbf74c5464c094652f758',
          client: '675cbf1b6b8f36c655c2dc56',
          __v: 0,
        },
        {
          _id: '675cc153c5464c094652f76d',
          start_time: '2024-12-13T21:00:00.000Z',
          end_time: '2024-12-13T21:30:00.000Z',
          nutritionist: '675cbf74c5464c094652f758',
          client: '675cbf1b6b8f36c655c2dc56',
          __v: 0,
        },
      ],
    },
  },
}
