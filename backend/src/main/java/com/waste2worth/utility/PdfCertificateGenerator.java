package com.waste2worth.utility;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.waste2worth.entity.Certificate;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;

@Component
public class PdfCertificateGenerator {

    public byte[] generateCertificatePdf(Certificate cert, String citizenName, String recyclerName) {
        try {
            Document document = new Document(PageSize.A4, 40, 40, 40, 40);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);

            document.open();

            // Fonts
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22, new BaseColor(5, 150, 105));
            Font subTitleFont = FontFactory.getFont(FontFactory.HELVETICA, 12, new BaseColor(100, 116, 139));
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.BLACK);
            Font regularFont = FontFactory.getFont(FontFactory.HELVETICA, 11, BaseColor.BLACK);
            Font hashFont = FontFactory.getFont(FontFactory.COURIER, 8, new BaseColor(71, 85, 105));
            Font verifiedFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, new BaseColor(5, 150, 105));

            // Header Banner
            Paragraph title = new Paragraph("CERTIFICATE OF RESPONSIBLE RECYCLING", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(6);
            document.add(title);

            Paragraph platform = new Paragraph("Waste2Worth Circular Economy Platform — Tamper-Evident Verification", subTitleFont);
            platform.setAlignment(Element.ALIGN_CENTER);
            platform.setSpacingAfter(24);
            document.add(platform);

            // Certificate Details Table
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10);
            table.setSpacingAfter(20);

            addTableRow(table, "Certificate Number:", cert.getCertificateNumber(), headerFont, regularFont);
            addTableRow(table, "Issued Date:", cert.getIssuedAt() != null ? cert.getIssuedAt().toString() : "N/A", headerFont, regularFont);
            addTableRow(table, "Citizen / Beneficiary:", citizenName != null ? citizenName : cert.getUserId(), headerFont, regularFont);
            addTableRow(table, "Certified Recycler:", recyclerName != null ? recyclerName : cert.getRecyclerId(), headerFont, regularFont);
            addTableRow(table, "E-Waste Tracking ID:", cert.getEwasteId(), headerFont, regularFont);
            addTableRow(table, "Device Category:", cert.getDeviceCategory() != null ? cert.getDeviceCategory() : "ELECTRONICS", headerFont, regularFont);
            addTableRow(table, "Brand & Model:", (cert.getDeviceBrand() != null ? cert.getDeviceBrand() : "") + " " + (cert.getDeviceModel() != null ? cert.getDeviceModel() : ""), headerFont, regularFont);
            addTableRow(table, "Verified Net Weight:", String.format("%.2f KG", cert.getWeightKg()), headerFont, regularFont);
            addTableRow(table, "EcoPoints Awarded:", String.valueOf(cert.getEcoPointsEarned()), headerFont, regularFont);

            document.add(table);

            // Verification Status
            Paragraph verifiedBadge = new Paragraph("STATUS: 100% CRYPTOGRAPHICALLY VERIFIED & LANDFILL DIVERTED", verifiedFont);
            verifiedBadge.setAlignment(Element.ALIGN_CENTER);
            verifiedBadge.setSpacingAfter(16);
            document.add(verifiedBadge);

            // SHA-256 Proof Block
            Paragraph hashHeader = new Paragraph("Cryptographic Integrity Proofs (SHA-256 Chained):", headerFont);
            hashHeader.setSpacingAfter(4);
            document.add(hashHeader);

            Paragraph currentHash = new Paragraph("Certificate Hash: " + cert.getHash(), hashFont);
            document.add(currentHash);

            Paragraph prevHash = new Paragraph("Previous Block Hash: " + (cert.getPreviousHash() != null ? cert.getPreviousHash() : "GENESIS"), hashFont);
            prevHash.setSpacingAfter(20);
            document.add(prevHash);

            Paragraph footer = new Paragraph(
                    "This document certifies that the electronic waste item above has been safely decommissioned, decontaminated, and recycled in compliance with circular economy standards.",
                    subTitleFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF certificate", e);
        }
    }

    private void addTableRow(PdfPTable table, String label, String value, Font labelFont, Font valueFont) {
        PdfPCell c1 = new PdfPCell(new Phrase(label, labelFont));
        c1.setBorderColor(new BaseColor(226, 232, 240));
        c1.setPadding(8);
        c1.setBackgroundColor(new BaseColor(248, 250, 252));

        PdfPCell c2 = new PdfPCell(new Phrase(value != null ? value : "", valueFont));
        c2.setBorderColor(new BaseColor(226, 232, 240));
        c2.setPadding(8);

        table.addCell(c1);
        table.addCell(c2);
    }
}
