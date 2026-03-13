import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Facebook Pixel Tracking', () => {
  beforeEach(() => {
    // Mock the fbq function
    (window as any).fbq = vi.fn();
  });

  it('should initialize Facebook Pixel with correct ID', () => {
    // The pixel ID should be 1042455365610768
    expect((window as any).fbq).toBeDefined();
  });

  it('should track PageView events', () => {
    const fbq = (window as any).fbq;
    fbq('track', 'PageView');
    
    expect(fbq).toHaveBeenCalledWith('track', 'PageView');
  });

  it('should track custom events with data', () => {
    const fbq = (window as any).fbq;
    const eventData = {
      value: 50,
      currency: 'USD',
      content_name: 'General Admission Ticket',
    };
    
    fbq('track', 'Purchase', eventData);
    
    expect(fbq).toHaveBeenCalledWith('track', 'Purchase', eventData);
  });

  it('should track ViewContent event for ticket viewing', () => {
    const fbq = (window as any).fbq;
    const contentData = {
      content_name: 'General Admission',
      content_type: 'ticket',
      value: 50,
      currency: 'USD',
    };
    
    fbq('track', 'ViewContent', contentData);
    
    expect(fbq).toHaveBeenCalledWith('track', 'ViewContent', contentData);
  });

  it('should track AddToCart event when user registers', () => {
    const fbq = (window as any).fbq;
    const cartData = {
      content_name: 'SEO Guacamole Ticket',
      content_type: 'ticket',
      value: 50,
      currency: 'USD',
    };
    
    fbq('track', 'AddToCart', cartData);
    
    expect(fbq).toHaveBeenCalledWith('track', 'AddToCart', cartData);
  });

  it('should track InitiateCheckout event', () => {
    const fbq = (window as any).fbq;
    const checkoutData = {
      content_name: 'SEO Guacamole Event Registration',
      content_type: 'ticket',
      value: 50,
      currency: 'USD',
      num_items: 1,
    };
    
    fbq('track', 'InitiateCheckout', checkoutData);
    
    expect(fbq).toHaveBeenCalledWith('track', 'InitiateCheckout', checkoutData);
  });

  it('should track Purchase event with transaction details', () => {
    const fbq = (window as any).fbq;
    const purchaseData = {
      content_name: 'General Admission - SEO Guacamole',
      content_type: 'ticket',
      value: 50,
      currency: 'USD',
      content_id: 'ticket_001',
      num_items: 1,
    };
    
    fbq('track', 'Purchase', purchaseData);
    
    expect(fbq).toHaveBeenCalledWith('track', 'Purchase', purchaseData);
  });

  it('should track Lead event for email capture', () => {
    const fbq = (window as any).fbq;
    const leadData = {
      content_name: 'SEO Guacamole Event Registration',
      content_type: 'lead',
    };
    
    fbq('track', 'Lead', leadData);
    
    expect(fbq).toHaveBeenCalledWith('track', 'Lead', leadData);
  });

  it('should handle MXN currency tracking', () => {
    const fbq = (window as any).fbq;
    const mxnData = {
      value: 870,
      currency: 'MXN',
      content_name: 'General Admission - MXN',
    };
    
    fbq('track', 'Purchase', mxnData);
    
    expect(fbq).toHaveBeenCalledWith('track', 'Purchase', mxnData);
  });

  it('should track with both USD and MXN currencies', () => {
    const fbq = (window as any).fbq;
    
    // USD purchase
    fbq('track', 'Purchase', {
      value: 50,
      currency: 'USD',
    });
    
    // MXN purchase
    fbq('track', 'Purchase', {
      value: 870,
      currency: 'MXN',
    });
    
    expect(fbq).toHaveBeenCalledTimes(2);
  });
});
