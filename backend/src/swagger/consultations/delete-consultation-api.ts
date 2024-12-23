export const DeleteConsultationApiResponse = {
  status: 200,
  description: 'Consulta deletada com sucesso.',
  schema: {
    example: {
      consultation: {
        _id: '6769d0a8eab16deaf2a7ffbd',
        start_time: '2024-12-22T11:00:00.000Z',
        end_time: '2024-12-22T13:00:00.000Z',
        nutritionist: '6769b7004ab000bd0e461579',
        client: '6769b7014ab000bd0e461585',
        recurrence_interval: 7,
        recurrence_end_time: '2025-01-16T23:59:59.999Z',
        __v: 0,
      },
    },
  },
}
