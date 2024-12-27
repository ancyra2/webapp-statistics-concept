import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({
    description: 'Image URL (dosyanın yolu veya bağlantısı)',
    example: 'http://example.com/uploads/image.jpg',
  })
  readonly url: string;

  @ApiProperty({
    description: 'Image alt metni (Erişilebilirlik için)',
    example: 'A beautiful sunrise over the mountains',
  })
  readonly alt: string;

  @ApiProperty({
    description: 'Image caption (Resim açıklaması)',
    example: 'Sunrise in the Alps',
    required: false,
  })
  readonly caption?: string;
}
