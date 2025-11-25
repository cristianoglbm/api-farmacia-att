const paciente = await prisma.paciente.create({
  data: {
    Nome_paciente: "Teste Paciente",
    Data_Nascimento: new Date("1990-01-01"),
  },
});
console.log("Paciente criado:", paciente);
