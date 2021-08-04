class MediaDto {
  id: string;
  amount: number;
}

export class OrderDto {
  id: string;
  customerId: string;
  medias: MediaDto[];
}
