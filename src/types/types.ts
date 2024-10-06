export interface State {
    sigla: string;
    nome: string;
    cidades: string[];
  };
  
export interface Country  {
    estados: State[];
  };
