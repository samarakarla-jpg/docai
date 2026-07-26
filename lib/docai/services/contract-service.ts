import type {
  Document,
  DocumentService,
} from "../../documents/document-service";
import type {
  ContractContent,
  ContractType,
} from "../domain/contract-models";

export interface ContractDraft extends Document<ContractContent> {
  readonly contractType: ContractType;
}

export interface CreateContractDraftInput {
  readonly id: string;
  readonly title: string;
  readonly content: ContractContent;
}

export interface UpdateContractDraftInput {
  readonly title?: string;
  readonly content?: ContractContent;
}

export type ContractDocumentService = Pick<
  DocumentService<ContractContent>,
  "create" | "getById" | "list" | "update" | "remove"
>;

export class ContractService {
  private readonly documents: ContractDocumentService;

  constructor(documents: ContractDocumentService) {
    this.documents = documents;
  }

  async createDraft(input: CreateContractDraftInput): Promise<ContractDraft> {
    this.validateContent(input.content);
    const document = await this.documents.create({
      id: input.id,
      title: input.title,
      content: input.content,
    });

    return this.toDraft(document);
  }

  async getDraft(id: string): Promise<ContractDraft> {
    return this.toDraft(await this.documents.getById(id));
  }

  async listDrafts(): Promise<readonly ContractDraft[]> {
    const documents = await this.documents.list();
    return documents.map((document) => this.toDraft(document));
  }

  async updateDraft(
    id: string,
    input: UpdateContractDraftInput,
  ): Promise<ContractDraft> {
    if (input.content !== undefined) {
      this.validateContent(input.content);
    }

    const document = await this.documents.update(id, input);
    return this.toDraft(document);
  }

  async removeDraft(id: string): Promise<void> {
    return this.documents.remove(id);
  }

  private validateContent(content: ContractContent): void {
    if (content.parties.length === 0) {
      throw new Error("A contract must include at least one party.");
    }

    for (const party of content.parties) {
      if (party.name.trim().length === 0) {
        throw new Error("Contract party name must be a non-empty string.");
      }
    }

    switch (content.type) {
      case "services":
        this.assertFields(content.scope, content.compensation, content.term);
        return;
      case "sale":
        this.assertFields(content.subject, content.price, content.delivery);
        return;
      case "rental":
        this.assertFields(content.property, content.rent, content.term);
        return;
      case "loan":
        this.assertFields(content.subject, content.repayment, content.term);
        return;
    }
  }

  private assertFields(...values: readonly string[]): void {
    if (values.some((value) => value.trim().length === 0)) {
      throw new Error("Contract content contains an empty required field.");
    }
  }

  private toDraft(document: Document<ContractContent>): ContractDraft {
    return {
      ...document,
      contractType: document.content.type,
    };
  }
}
