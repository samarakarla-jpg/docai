import { createRequire } from "node:module";

import type {
  Template,
  TemplateStorage,
  TemplateService as GenericTemplateService,
} from "../../templates/template-service";
import type {
  ContractTemplateContent,
  ContractType,
} from "../domain/contract-models";

const requireModule = createRequire(import.meta.url);
const {
  TemplateService: GenericTemplateServiceConstructor,
}: {
  TemplateService: new <TContent>(
    storage: TemplateStorage<TContent>,
  ) => GenericTemplateService<TContent>;
} = requireModule("../../templates/template-service.ts");

export type ContractTemplate = Template<ContractTemplateContent>;

export interface CreateContractTemplateInput {
  readonly id: string;
  readonly type: ContractType;
  readonly title: string;
  readonly instructions: string;
}

export interface UpdateContractTemplateInput {
  readonly title?: string;
  readonly instructions?: string;
}

export class TemplateService {
  private readonly templates: GenericTemplateService<ContractTemplateContent>;

  constructor(storage: TemplateStorage<ContractTemplateContent>) {
    this.templates = new GenericTemplateServiceConstructor(storage);
  }

  async create(input: CreateContractTemplateInput): Promise<ContractTemplate> {
    this.assertSupportedType(input.type);
    this.assertNonBlank(input.instructions, "Template instructions");

    return this.templates.create({
      id: input.id,
      name: input.title,
      content: {
        type: input.type,
        title: input.title,
        instructions: input.instructions,
      },
    });
  }

  async getById(id: string): Promise<ContractTemplate> {
    return this.templates.getById(id);
  }

  async list(): Promise<readonly ContractTemplate[]> {
    return this.templates.list();
  }

  async update(
    id: string,
    input: UpdateContractTemplateInput,
  ): Promise<ContractTemplate> {
    this.assertOptionalText(input.title, "Template title");
    this.assertOptionalText(input.instructions, "Template instructions");

    if (input.title === undefined && input.instructions === undefined) {
      throw new Error("Template update must include a title or instructions.");
    }

    const existing = await this.templates.getById(id);
    const update: {
      readonly name?: string;
      readonly content: ContractTemplateContent;
    } = {
      content: {
        ...existing.content,
        title: input.title ?? existing.content.title,
        instructions: input.instructions ?? existing.content.instructions,
      },
    };

    if (input.title !== undefined) {
      return this.templates.update(id, { ...update, name: input.title });
    }

    return this.templates.update(id, update);
  }

  async remove(id: string): Promise<void> {
    return this.templates.remove(id);
  }

  private assertSupportedType(type: ContractType): void {
    if (
      type !== "services" &&
      type !== "sale" &&
      type !== "rental" &&
      type !== "loan"
    ) {
      throw new Error("Unsupported contract template type.");
    }
  }

  private assertNonBlank(value: string, field: string): void {
    if (value.trim().length === 0) {
      throw new Error(`${field} must be a non-empty string.`);
    }
  }

  private assertOptionalText(value: string | undefined, field: string): void {
    if (value !== undefined) {
      this.assertNonBlank(value, field);
    }
  }
}
