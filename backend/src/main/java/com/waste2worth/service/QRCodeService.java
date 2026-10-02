package com.waste2worth.service;

import com.waste2worth.utility.QRCodeUtil;
import org.springframework.stereotype.Service;

@Service
public class QRCodeService {

    public byte[] generateQRCodePng(String content, int width, int height) {
        return QRCodeUtil.generateQRCodeImage(content, width, height);
    }
}
