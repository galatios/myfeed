// A map of publisher names to their logo URLs.
// In a real application, this could be a more dynamic system or a larger database.
const publisherLogos: Record<string, string> = {
    'Reuters': 'https://s.yimg.com/ny/api/res/1.2/K0M2T509VZYrv42lZvYjzA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-02/0e893220-75b1-11eb-9ffb-9442b9d8e4f6',
    'The Motley Fool': 'https://s.yimg.com/ny/api/res/1.2/K3Iqzee..sT53ssY3T965w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-03/483658f0-7d72-11eb-9dff-c50f83cec109',
    'Bloomberg': 'https://s.yimg.com/ny/api/res/1.2/P8X5215t2l23aB4pM5qF4w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-02/521a81e0-75b1-11eb-bffb-9e4479e00947',
    'Business Wire': 'https://s.yimg.com/ny/api/res/1.2/O0o5u35a9kTLRkn_NMrK2g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-02/e0e1f6e0-75b1-11eb-b7af-c709151ab308',
    'Associated Press': 'https://s.yimg.com/ny/api/res/1.2/L752mIxC_h2Hq6erQAFaJQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-02/9233a7e0-75b1-11eb-9fcf-b6b90ba3bd46',
    'Investor\'s Business Daily': 'https://s.yimg.com/ny/api/res/1.2/S2xV_4q9orvrW2w1LZYUcA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-03/b43e8d70-7d7c-11eb-b7f7-b6a82a1f81c9',
    'MarketWatch': 'https://s.yimg.com/ny/api/res/1.2/m.w1_o2aEWp4p3Qy2i5Pgw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-03/93096230-7d73-11eb-bffb-9e4479e00947',
    'Yahoo Finance': 'https://s.yimg.com/cv/apiv2/social/images/yahoo_finance_en-US_h_p_finance.png',
    'Zacks': 'https://s.yimg.com/ny/api/res/1.2/OVnEvb2MchXAXs0yT2xNqA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-03/897531c0-7d7b-11eb-9fcf-b6b90ba3bd46',
    'TipRanks': 'https://s.yimg.com/ny/api/res/1.2/EHeqNm55a4y2yJc3mTqNqg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2022-03/17e296a0-a734-11ec-bbfb-931a238b7de4',
    'Benzinga': 'https://s.yimg.com/ny/api/res/1.2/8iww5x9CSTeLg9M415d_3A--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-02/a32b95b0-75b1-11eb-8c7f-020a1cd5664d',
    'PR Newswire': 'https://s.yimg.com/ny/api/res/1.2/uCgSHrgY51Rj0i07yV_iMQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-02/10b42790-75b2-11eb-9eff-824e4c9f16d5',
    'CNW Group': 'https://s.yimg.com/ny/api/res/1.2/O0o5u35a9kTLRkn_NMrK2g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-02/e0e1f6e0-75b1-11eb-b7af-c709151ab308',
    'GlobeNewswire': 'https://s.yimg.com/ny/api/res/1.2/uCgSHrgY51Rj0i07yV_iMQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-02/10b42790-75b2-11eb-9eff-824e4c9f16d5',
    'The Wall Street Journal.': 'https://s.yimg.com/ny/api/res/1.2/c.tSMl0R4a8G0p33GKLzXA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-03/23b1a8d0-7d74-11eb-9dff-c50f83cec109',
    'Barrons.com': 'https://s.yimg.com/ny/api/res/1.2/A3iCCnWyI47Iu1s7pTjVSw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-03/d9a3b630-7d70-11eb-bf7b-6a84f33d790d',
    'Insider Monkey': 'https://s.yimg.com/ny/api/res/1.2/kYV_1.JIOB2uH5.n2T6vSA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-03/344062f0-7d7c-11eb-b7f7-b6a82a1f81c9',
    'GOBankingRates': 'https://s.yimg.com/ny/api/res/1.2/VpHiikHwzC8TqfV3I3x62w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2O2g9MTY-/https://s.yimg.com/os/creatr-uploaded-images/2021-03/906a2560-7d72-11eb-bc7f-f7c81308d0a3',
};

export function getPublisherLogo(publisherName: string): string | undefined {
    return publisherLogos[publisherName];
}
