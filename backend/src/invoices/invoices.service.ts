import { Injectable, Logger } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);
  private readonly invoicesDir = path.join(process.cwd(), 'invoices');

  constructor() {
    if (!fs.existsSync(this.invoicesDir)) {
      fs.mkdirSync(this.invoicesDir);
    }
  }

  async generateInvoice(order: any): Promise<string> {
    const fileName = `fatura_${order.id}.pdf`;
    const filePath = path.join(this.invoicesDir, fileName);

    return new Promise((resolve, reject) => {
      // Usar a forma correta de instanciar o PDFDocument
      const PDF = require('pdfkit');
      const doc = new PDF({ margin: 50 });

      doc.pipe(fs.createWriteStream(filePath));

      // Cabeçalho
      doc
        .fillColor('#444444')
        .fontSize(20)
        .text('Pizzaria Rural', 110, 57)
        .fontSize(10)
        .text('A melhor pizza da região', 200, 65, { align: 'right' })
        .text('Rua das Oliveiras, 123', 200, 80, { align: 'right' })
        .text('Viseu, Portugal', 200, 95, { align: 'right' })
        .moveDown();

      // Linha horizontal
      doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, 115).lineTo(550, 115).stroke();

      // Info da Fatura
      doc
        .fontSize(10)
        .text(`Fatura: ${order.id}`, 50, 130)
        .text(`Data: ${new Date().toLocaleDateString('pt-PT')}`, 50, 145)
        .text(`Total: ${(order.total / 100).toFixed(2)}€`, 50, 160)
        .moveDown();

      // Cliente
      doc
        .text('Cliente:', 300, 130)
        .text(`Telefone: ${order.phone}`, 300, 145)
        .text(`Morada: ${order.address}`, 300, 160)
        .moveDown();

      // Itens
      let y = 200;
      doc.text('Item', 50, y);
      doc.text('Qtd', 300, y);
      doc.text('Preço Unit.', 400, y);
      doc.text('Total', 500, y);

      doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y + 15).lineTo(550, y + 15).stroke();

      y += 30;
      order.items.forEach((item: any) => {
        doc.text(`Pizza ID: ${item.pizzaId}`, 50, y);
        doc.text(`${item.quantity}`, 300, y);
        doc.text(`${(item.unitPrice / 100).toFixed(2)}€`, 400, y);
        doc.text(`${((item.quantity * item.unitPrice) / 100).toFixed(2)}€`, 500, y);
        y += 20;
      });

      // Rodapé
      doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, 700).lineTo(550, 700).stroke();
      doc.fontSize(10).text('Obrigado pela sua preferência!', 50, 720, { align: 'center', width: 500 });

      doc.end();

      doc.on('end', () => {
        this.logger.log(`Fatura gerada com sucesso: ${filePath}`);
        resolve(filePath);
      });

      doc.on('error', (err: any) => {
        reject(err);
      });
    });
  }
}
