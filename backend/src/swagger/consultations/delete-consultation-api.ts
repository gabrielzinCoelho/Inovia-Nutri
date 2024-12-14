export const DeleteConsultationApiResponse = {
  status: 200,
  description: 'Consulta deletada com sucesso.',
  schema: {
    example: {
      consultation: {
        _id: '675cc635ec30b8deabcc3619',
        start_time: '2024-12-13T22:10:00.000Z',
        end_time: '2024-12-13T22:20:00.000Z',
        nutritionist: '675cbf1b6b8f36c655c2dc4f',
        client: '675cbf1b6b8f36c655c2dc56',
        __v: 0,
      },
    },
  },
}
