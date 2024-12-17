export const FetchConsultationstApiResponse = {
  status: 200,
  description: 'Consultas buscadas com sucesso.',
  schema: {
    example: {
      consultations: [
        {
          _id: '6761aae5fc6351925eba9880',
          start_time: '2024-12-18T10:30:00.000Z',
          end_time: '2024-12-18T11:30:00.000Z',
          nutritionist: {
            _id: '6761aacffc6351925eba987a',
            name: 'John Doe',
          },
          client: {
            _id: '6761aaac9e618aa08732edb3',
            name: 'Noel Bergstrom',
          },
          __v: 0,
        },
        {
          _id: '6761aaf5fc6351925eba9886',
          start_time: '2024-12-17T10:30:00.000Z',
          end_time: '2024-12-17T11:00:00.000Z',
          nutritionist: {
            _id: '6761aacffc6351925eba987a',
            name: 'John Doe',
          },
          client: {
            _id: '6761aaac9e618aa08732edb4',
            name: 'Shelia Lueilwitz',
          },
          __v: 0,
        },
      ],
    },
  },
}
