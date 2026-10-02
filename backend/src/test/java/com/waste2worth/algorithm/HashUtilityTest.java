package com.waste2worth.algorithm;

import com.waste2worth.utility.HashUtility;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class HashUtilityTest {

    @Test
    void testSHA256Generates64CharacterHex() {
        String input = "W2W-EW-1002:usr-101:LAPTOP:1727265000000";
        String hash = HashUtility.generateSHA256(input);

        assertNotNull(hash);
        assertEquals(64, hash.length());
        // Verify deterministic hashing
        assertEquals(hash, HashUtility.generateSHA256(input));
    }

    @Test
    void testDifferentInputsProduceDifferentHashes() {
        String hash1 = HashUtility.generateSHA256("data1");
        String hash2 = HashUtility.generateSHA256("data2");

        assertNotEquals(hash1, hash2);
    }
}
