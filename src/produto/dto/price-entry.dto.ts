export class PriceEntryDto {
  id!: number;
  mercado!: string;
  marca!: string;
  peso!: string;
  nomeOriginal!: string;
  nomeLimpo!: string;
  nomeOrdenado!: string;
  url?: string;
  preco!: number;
  imagem?: string;
  coletadoEm!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}

export class PriceComparisonDto {
  mercado!: string;
  preco!: number;
  coletadoEm!: Date;
}

export class PriceTrendDto {
  nomeLimpo!: string;
  entries!: PriceEntryDto[];
  statistics!: {
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
    latestPrice: number;
    priceChange: number;
    percentChange: number;
    totalDataPoints: number;
  };
}

export class PriceVariationDto {
  nomeLimpo!: string;
  minPrice!: number;
  maxPrice!: number;
  variation!: number;
  percentVariation!: number;
  dataPoints!: number;
}
