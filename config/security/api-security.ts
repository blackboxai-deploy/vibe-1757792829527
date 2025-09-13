// 🛡️ DeepGaza AI-Driven Cyber Offensive - API Security Configuration
// Advanced security configuration for TLS 1.3 and OWASP compliance

import { SecurityConfig } from '@/types';

export const API_SECURITY_CONFIG: SecurityConfig = {
  encryption: {
    algorithm: 'AES-256-GCM',
    keySize: 256,
    enabled: true,
  },
  rateLimiting: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 requests per minute per user
    skipSuccessfulRequests: false,
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'deepgaza-jwt-secret-2025',
    tokenExpiration: '1h',
    refreshTokenExpiration: '7d',
  },
  sandbox: {
    memoryLimit: 512, // 512 MB per agent
    cpuLimit: 50, // 50% CPU limit per agent
    networkIsolation: true,
    fileSystemIsolation: true,
  },
};

// TLS 1.3 Configuration
export const TLS_CONFIG = {
  minVersion: 'TLSv1.3',
  maxVersion: 'TLSv1.3',
  ciphers: [
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    'TLS_AES_128_GCM_SHA256',
  ],
  secureProtocol: 'TLSv1_3_method',
  honorCipherOrder: true,
  sessionIdContext: 'deepgaza',
};

// OWASP Security Headers
export const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "connect-src 'self' wss: https:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()',
  ].join(', '),
};

// Input Validation Rules (OWASP Compliance)
export const INPUT_VALIDATION_RULES = {
  maxStringLength: 10000,
  maxArrayLength: 1000,
  maxObjectDepth: 10,
  allowedFileTypes: ['.txt', '.json', '.yaml', '.yml', '.md'],
  maxFileSize: 10 * 1024 * 1024, // 10MB
  sanitization: {
    removeHtml: true,
    removeScripts: true,
    trimWhitespace: true,
    normalizeUnicode: true,
  },
};

// Agent Isolation Configuration
export const AGENT_ISOLATION_CONFIG = {
  containerRuntime: 'docker',
  networkMode: 'bridge',
  memorySwappiness: 0,
  memoryReservation: '256m',
  cpuPeriod: 100000,
  cpuQuota: 50000, // 50% CPU
  pidLimit: 100,
  ulimits: {
    nofile: { soft: 1024, hard: 1024 },
    nproc: { soft: 512, hard: 512 },
  },
  capabilities: {
    drop: ['ALL'],
    add: ['NET_BIND_SERVICE'], // Only if needed
  },
  readOnlyRootfs: true,
  noNewPrivileges: true,
  seccompProfile: 'default',
  apparmorProfile: 'default',
};

// WebSocket Security Configuration
export const WEBSOCKET_SECURITY_CONFIG = {
  pingTimeout: 20000,
  pingInterval: 25000,
  maxHttpBufferSize: 1e6, // 1MB
  allowEIO3: false,
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
  cookie: {
    name: 'deepgaza-session',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
};

// Encryption Utilities
export class SecurityUtils {
  private static instance: SecurityUtils;

  public static getInstance(): SecurityUtils {
    if (!SecurityUtils.instance) {
      SecurityUtils.instance = new SecurityUtils();
    }
    return SecurityUtils.instance;
  }

  /**
   * Generate a secure random string for session IDs, tokens, etc.
   */
  public generateSecureToken(length: number = 32): string {
    const crypto = require('crypto');
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Hash a password using bcrypt with salt
   */
  public async hashPassword(password: string): Promise<string> {
    const bcrypt = require('bcryptjs');
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Verify a password against its hash
   */
  public async verifyPassword(password: string, hash: string): Promise<boolean> {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(password, hash);
  }

  /**
   * Encrypt data using AES-256-GCM
   */
  public encryptData(data: string, key: string): { encrypted: string; iv: string; tag: string } {
    const crypto = require('crypto');
    const algorithm = 'aes-256-gcm';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(algorithm, key);
    cipher.setAAD(Buffer.from('deepgaza-aad'));
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();

    return {
      encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex'),
    };
  }

  /**
   * Decrypt data using AES-256-GCM
   */
  public decryptData(encryptedData: string, key: string, iv: string, tag: string): string {
    const crypto = require('crypto');
    const algorithm = 'aes-256-gcm';
    const decipher = crypto.createDecipher(algorithm, key);
    decipher.setAAD(Buffer.from('deepgaza-aad'));
    decipher.setAuthTag(Buffer.from(tag, 'hex'));

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  /**
   * Sanitize input according to OWASP guidelines
   */
  public sanitizeInput(input: any): any {
    if (typeof input === 'string') {
      return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .trim() // Remove whitespace
        .substring(0, INPUT_VALIDATION_RULES.maxStringLength); // Limit length
    }
    
    if (Array.isArray(input)) {
      return input
        .slice(0, INPUT_VALIDATION_RULES.maxArrayLength)
        .map(item => this.sanitizeInput(item));
    }
    
    if (typeof input === 'object' && input !== null) {
      const sanitized: any = {};
      let depth = 0;
      
      const sanitizeObject = (obj: any, currentDepth: number): any => {
        if (currentDepth >= INPUT_VALIDATION_RULES.maxObjectDepth) {
          return {};
        }
        
        const result: any = {};
        for (const [key, value] of Object.entries(obj)) {
          result[this.sanitizeInput(key)] = this.sanitizeInput(value);
        }
        return result;
      };
      
      return sanitizeObject(input, depth);
    }
    
    return input;
  }

  /**
   * Validate file upload security
   */
  public validateFileUpload(filename: string, fileSize: number, mimeType: string): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    // Check file extension
    const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    if (!INPUT_VALIDATION_RULES.allowedFileTypes.includes(ext)) {
      errors.push(`File type ${ext} not allowed`);
    }
    
    // Check file size
    if (fileSize > INPUT_VALIDATION_RULES.maxFileSize) {
      errors.push(`File size exceeds maximum allowed size`);
    }
    
    // Check MIME type
    const allowedMimeTypes = [
      'text/plain',
      'application/json',
      'application/x-yaml',
      'text/yaml',
      'text/markdown',
    ];
    if (!allowedMimeTypes.includes(mimeType)) {
      errors.push(`MIME type ${mimeType} not allowed`);
    }
    
    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export default {
  API_SECURITY_CONFIG,
  TLS_CONFIG,
  SECURITY_HEADERS,
  INPUT_VALIDATION_RULES,
  AGENT_ISOLATION_CONFIG,
  WEBSOCKET_SECURITY_CONFIG,
  SecurityUtils,
};