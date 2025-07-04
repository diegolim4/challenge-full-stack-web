import { IStudent } from '../../../domain/interfaces/student';

interface Dependencies {
  generateCode: () => number;
}

export class CreateStudentUseCase {
  constructor(private readonly deps: Dependencies) {}

  async execute(input: IStudent): Promise<{ student: IStudent }> {
    const student: IStudent = {
      ...input,
      studentRecord: this.deps.generateCode(),
    };

    return { student };
  }
}
