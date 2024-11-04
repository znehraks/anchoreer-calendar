import test, { expect } from '@playwright/test';
import { IDuty } from '../src/api/services/duties';

test.describe('job filter test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.addInitScript(() => {
      localStorage.clear();
    });
    await page.route('/api/duties', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 1,
            name: '경영·사무',
            parent_id: null,
          },
          {
            id: 2,
            name: '마케팅·광고·홍보',
            parent_id: null,
          },
          {
            id: 3,
            name: '무역·유통',
            parent_id: null,
          },
          {
            id: 4,
            name: 'IT·인터넷',
            parent_id: null,
          },
          {
            id: 5,
            name: '생산·제조',
            parent_id: null,
          },
          {
            id: 6,
            name: '영업·고객상담',
            parent_id: null,
          },
          {
            id: 7,
            name: '건설',
            parent_id: null,
          },
          {
            id: 8,
            name: '금융',
            parent_id: null,
          },
          {
            id: 9,
            name: '연구개발·설계',
            parent_id: null,
          },
          {
            id: 10,
            name: '디자인',
            parent_id: null,
          },
          {
            id: 11,
            name: '미디어',
            parent_id: null,
          },
          {
            id: 12,
            name: '전문·특수직',
            parent_id: null,
          },
          {
            id: 13,
            name: '기획·전략·경영',
            parent_id: 1,
          },
          {
            id: 14,
            name: '인사·노무·교육',
            parent_id: 1,
          },
          {
            id: 15,
            name: '재무·세무·IR',
            parent_id: 1,
          },
          {
            id: 16,
            name: '경리·회계·결산',
            parent_id: 1,
          },
          {
            id: 17,
            name: '일반사무·총무·비서',
            parent_id: 1,
          },
          {
            id: 18,
            name: '법무',
            parent_id: 1,
          },
          {
            id: 19,
            name: '경영기획',
            parent_id: 13,
          },
          {
            id: 20,
            name: '사업기획',
            parent_id: 13,
          },
          {
            id: 21,
            name: '경영전략',
            parent_id: 13,
          },
          {
            id: 22,
            name: '사업전략',
            parent_id: 13,
          },
          {
            id: 23,
            name: '경영분석·컨설턴트',
            parent_id: 13,
          },
          {
            id: 24,
            name: '기타',
            parent_id: 13,
          },
          {
            id: 25,
            name: '인사',
            parent_id: 14,
          },
          {
            id: 26,
            name: '노무',
            parent_id: 14,
          },
          {
            id: 27,
            name: '교육',
            parent_id: 14,
          },
          {
            id: 28,
            name: '채용',
            parent_id: 14,
          },
          {
            id: 29,
            name: '급여',
            parent_id: 14,
          },
          {
            id: 30,
            name: '보상관리',
            parent_id: 14,
          },
          {
            id: 31,
            name: '기타',
            parent_id: 14,
          },
          {
            id: 32,
            name: '재무',
            parent_id: 15,
          },
          {
            id: 33,
            name: '세무',
            parent_id: 15,
          },
          {
            id: 34,
            name: 'IR',
            parent_id: 15,
          },
          {
            id: 35,
            name: '자금',
            parent_id: 15,
          },
          {
            id: 36,
            name: '기타',
            parent_id: 15,
          },
          {
            id: 37,
            name: '일반사무',
            parent_id: 17,
          },
          {
            id: 38,
            name: '총무',
            parent_id: 17,
          },
          {
            id: 39,
            name: '비서',
            parent_id: 17,
          },
          {
            id: 40,
            name: '사무보조',
            parent_id: 17,
          },
          {
            id: 41,
            name: '기타',
            parent_id: 17,
          },
          {
            id: 42,
            name: '마케팅',
            parent_id: 2,
          },
          {
            id: 43,
            name: '광고·홍보',
            parent_id: 2,
          },
          {
            id: 44,
            name: '브랜드마케팅',
            parent_id: 42,
          },
          {
            id: 45,
            name: '콘텐츠마케팅',
            parent_id: 42,
          },
          {
            id: 46,
            name: '퍼포먼스·온라인마케팅',
            parent_id: 42,
          },
          {
            id: 47,
            name: '마케팅전략·기획',
            parent_id: 42,
          },
          {
            id: 48,
            name: '상품기획',
            parent_id: 42,
          },
          {
            id: 49,
            name: '기타',
            parent_id: 42,
          },
          {
            id: 50,
            name: '광고기획·AE',
            parent_id: 43,
          },
          {
            id: 51,
            name: '광고제작·카피',
            parent_id: 43,
          },
          {
            id: 52,
            name: '언론홍보·PR',
            parent_id: 43,
          },
          {
            id: 53,
            name: '사내홍보',
            parent_id: 43,
          },
          {
            id: 54,
            name: '기타',
            parent_id: 43,
          },
          {
            id: 55,
            name: '유통·물류·재고',
            parent_id: 3,
          },
          {
            id: 56,
            name: '무역·해외영업',
            parent_id: 3,
          },
          {
            id: 57,
            name: '구매·자재',
            parent_id: 3,
          },
          {
            id: 58,
            name: '운전·운송',
            parent_id: 3,
          },
          {
            id: 59,
            name: '상품기획·MD',
            parent_id: 3,
          },
          {
            id: 60,
            name: '물류관리·기획',
            parent_id: 55,
          },
          {
            id: 61,
            name: '유통관리·기획',
            parent_id: 55,
          },
          {
            id: 62,
            name: '재고',
            parent_id: 55,
          },
          {
            id: 63,
            name: '기타',
            parent_id: 55,
          },
          {
            id: 64,
            name: '해외영업',
            parent_id: 56,
          },
          {
            id: 65,
            name: '무역·수출입관리',
            parent_id: 56,
          },
          {
            id: 66,
            name: '기타',
            parent_id: 56,
          },
          {
            id: 67,
            name: '구매',
            parent_id: 57,
          },
          {
            id: 68,
            name: '자재',
            parent_id: 57,
          },
          {
            id: 69,
            name: '기타',
            parent_id: 57,
          },
          {
            id: 70,
            name: 'QA',
            parent_id: 4,
          },
          {
            id: 71,
            name: '앱개발',
            parent_id: 4,
          },
          {
            id: 72,
            name: '웹개발',
            parent_id: 4,
          },
          {
            id: 73,
            name: '데이터엔지니어·분석·DBA',
            parent_id: 4,
          },
          {
            id: 74,
            name: '시스템프로그래머',
            parent_id: 4,
          },
          {
            id: 75,
            name: '응용프로그래머',
            parent_id: 4,
          },
          {
            id: 76,
            name: '네트워크·보안·운영',
            parent_id: 4,
          },
          {
            id: 77,
            name: '빅데이터·AI(인공지능)',
            parent_id: 4,
          },
          {
            id: 78,
            name: '게임개발',
            parent_id: 4,
          },
          {
            id: 79,
            name: 'HW·임베디드',
            parent_id: 4,
          },
          {
            id: 80,
            name: 'SW·솔루션·ERP',
            parent_id: 4,
          },
          {
            id: 81,
            name: '서비스기획·PM',
            parent_id: 4,
          },
          {
            id: 82,
            name: 'iOS개발',
            parent_id: 71,
          },
          {
            id: 83,
            name: '안드로이드개발',
            parent_id: 71,
          },
          {
            id: 84,
            name: '기타',
            parent_id: 71,
          },
          {
            id: 85,
            name: '프론트엔드개발',
            parent_id: 72,
          },
          {
            id: 86,
            name: '서버·백엔드개발',
            parent_id: 72,
          },
          {
            id: 87,
            name: 'HTML·퍼블리싱',
            parent_id: 72,
          },
          {
            id: 88,
            name: '기타',
            parent_id: 72,
          },
          {
            id: 89,
            name: '데이터엔지니어',
            parent_id: 73,
          },
          {
            id: 90,
            name: '데이터분석',
            parent_id: 73,
          },
          {
            id: 91,
            name: 'DBA',
            parent_id: 73,
          },
          {
            id: 92,
            name: '기타',
            parent_id: 73,
          },
          {
            id: 93,
            name: '생산관리·공정관리·품질관리',
            parent_id: 5,
          },
          {
            id: 94,
            name: '안전·환경관리',
            parent_id: 5,
          },
          {
            id: 95,
            name: '생산·제조·설비·조립',
            parent_id: 5,
          },
          {
            id: 96,
            name: '설치·정비·AS·시공·공무',
            parent_id: 5,
          },
          {
            id: 97,
            name: '생산관리',
            parent_id: 93,
          },
          {
            id: 98,
            name: '공정관리',
            parent_id: 93,
          },
          {
            id: 99,
            name: '품질관리',
            parent_id: 93,
          },
          {
            id: 100,
            name: '기타',
            parent_id: 93,
          },
          {
            id: 101,
            name: '안전관리',
            parent_id: 94,
          },
          {
            id: 102,
            name: '환경관리',
            parent_id: 94,
          },
          {
            id: 103,
            name: '기타',
            parent_id: 94,
          },
          {
            id: 104,
            name: '제품·서비스영업',
            parent_id: 6,
          },
          {
            id: 105,
            name: 'IT·솔루션·기술영업',
            parent_id: 6,
          },
          {
            id: 106,
            name: 'B2B영업·법인영업',
            parent_id: 6,
          },
          {
            id: 107,
            name: '영업관리·지원·기획',
            parent_id: 6,
          },
          {
            id: 108,
            name: '아웃바운드',
            parent_id: 6,
          },
          {
            id: 109,
            name: '인바운드',
            parent_id: 6,
          },
          {
            id: 110,
            name: '고객응대·CS',
            parent_id: 6,
          },
          {
            id: 111,
            name: '금융·보험영업',
            parent_id: 6,
          },
          {
            id: 112,
            name: '현장·시공·감리·공무',
            parent_id: 7,
          },
          {
            id: 113,
            name: '안전·품질·관리',
            parent_id: 7,
          },
          {
            id: 114,
            name: '전기·통신',
            parent_id: 7,
          },
          {
            id: 115,
            name: '기계·설비·화학',
            parent_id: 7,
          },
          {
            id: 116,
            name: '토목·조경·도시',
            parent_id: 7,
          },
          {
            id: 117,
            name: '건축·설계·인테리어',
            parent_id: 7,
          },
          {
            id: 118,
            name: '환경·플랜트',
            parent_id: 7,
          },
          {
            id: 119,
            name: '부동산·영업·견적',
            parent_id: 7,
          },
          {
            id: 120,
            name: '증권·투자',
            parent_id: 8,
          },
          {
            id: 121,
            name: '외환·펀드·자산운용',
            parent_id: 8,
          },
          {
            id: 122,
            name: '보험계리사·손해사정',
            parent_id: 8,
          },
          {
            id: 123,
            name: '채권·심사',
            parent_id: 8,
          },
          {
            id: 124,
            name: '은행원',
            parent_id: 8,
          },
          {
            id: 125,
            name: '애널리스트',
            parent_id: 8,
          },
          {
            id: 126,
            name: '자동차·기계',
            parent_id: 9,
          },
          {
            id: 127,
            name: '화학·에너지·환경',
            parent_id: 9,
          },
          {
            id: 128,
            name: '바이오·제약·식품',
            parent_id: 9,
          },
          {
            id: 129,
            name: '기계설계·CAD·CAM',
            parent_id: 9,
          },
          {
            id: 130,
            name: '전기·전자·제어',
            parent_id: 9,
          },
          {
            id: 131,
            name: '반도체·디스플레이',
            parent_id: 9,
          },
          {
            id: 132,
            name: '통신기술·네트워크 구축',
            parent_id: 9,
          },
          {
            id: 133,
            name: '금속·철강',
            parent_id: 9,
          },
          {
            id: 134,
            name: '조선·항공·우주',
            parent_id: 9,
          },
          {
            id: 135,
            name: '인문·사회과학',
            parent_id: 9,
          },
          {
            id: 136,
            name: '자동차',
            parent_id: 126,
          },
          {
            id: 137,
            name: '기계',
            parent_id: 126,
          },
          {
            id: 138,
            name: '기타',
            parent_id: 126,
          },
          {
            id: 139,
            name: '화학',
            parent_id: 127,
          },
          {
            id: 140,
            name: '에너지',
            parent_id: 127,
          },
          {
            id: 141,
            name: '환경',
            parent_id: 127,
          },
          {
            id: 142,
            name: '화장품',
            parent_id: 127,
          },
          {
            id: 143,
            name: '기타',
            parent_id: 127,
          },
          {
            id: 144,
            name: '바이오·제약',
            parent_id: 128,
          },
          {
            id: 145,
            name: '식품',
            parent_id: 128,
          },
          {
            id: 146,
            name: '기타',
            parent_id: 128,
          },
          {
            id: 147,
            name: '광고·시각디자인',
            parent_id: 10,
          },
          {
            id: 148,
            name: '제품·산업디자인',
            parent_id: 10,
          },
          {
            id: 149,
            name: '건축·인테리어디자인',
            parent_id: 10,
          },
          {
            id: 150,
            name: '의류·패션·잡화디자인',
            parent_id: 10,
          },
          {
            id: 151,
            name: 'UI·UX디자인',
            parent_id: 10,
          },
          {
            id: 152,
            name: '광고 디자인',
            parent_id: 147,
          },
          {
            id: 153,
            name: '그래픽디자인·CG',
            parent_id: 147,
          },
          {
            id: 154,
            name: '출판·편집디자인',
            parent_id: 147,
          },
          {
            id: 155,
            name: '캐릭터·애니메이션',
            parent_id: 147,
          },
          {
            id: 156,
            name: '기타',
            parent_id: 147,
          },
          {
            id: 157,
            name: '연출·제작·PD·작가',
            parent_id: 11,
          },
          {
            id: 158,
            name: '음악·영상·사진',
            parent_id: 11,
          },
          {
            id: 159,
            name: '아나운서·리포터·성우·기자',
            parent_id: 11,
          },
          {
            id: 160,
            name: '무대·스탭·오퍼레이터',
            parent_id: 11,
          },
          {
            id: 161,
            name: '연예·엔터테인먼트',
            parent_id: 11,
          },
          {
            id: 162,
            name: '인쇄·출판·편집',
            parent_id: 11,
          },
          {
            id: 163,
            name: '리서치·시장조사',
            parent_id: 12,
          },
          {
            id: 164,
            name: '외국어·번역·통역',
            parent_id: 12,
          },
          {
            id: 165,
            name: '법률·특허·상표',
            parent_id: 12,
          },
          {
            id: 166,
            name: '회계·세무·CPA·CFA',
            parent_id: 12,
          },
          {
            id: 167,
            name: '보안·경비·경호',
            parent_id: 12,
          },
          {
            id: 168,
            name: '보건·의료',
            parent_id: 12,
          },
          {
            id: 169,
            name: '초·중·고 교사',
            parent_id: 12,
          },
          {
            id: 170,
            name: '교육개발·기획',
            parent_id: 12,
          },
          {
            id: 171,
            name: '외국어·자격증·기술강사',
            parent_id: 12,
          },
          {
            id: 172,
            name: '사회복지·요양보호·자원봉사',
            parent_id: 12,
          },
          {
            id: 173,
            name: '승무원·숙박·여행 서비스',
            parent_id: 12,
          },
          {
            id: 174,
            name: '음식서비스',
            parent_id: 12,
          },
        ]),
      });
    });
  });

  test('open job filter', async ({ page }) => {
    await page.click('[aria-label="job-filter-button"]');
    await page.waitForSelector('[aria-label="job-filter-modal"]');
    await expect(page.locator('[aria-label="job-filter-modal"]')).toBeVisible();
  });

  test('load job filter item', async ({ page }) => {
    const responsePromise = page.waitForResponse((response) => {
      return response.url().includes('/api/duties');
    });

    await page.click('[aria-label="job-filter-button"]');

    const response = await responsePromise;
    const duties = await response.json();
    expect(duties).not.toBeNull();
  });

  test('select root menu', async ({ page }) => {
    const responsePromise = page.waitForResponse((response) => {
      return response.url().includes('/api/duties');
    });

    await page.click('[aria-label="job-filter-button"]');

    const response = await responsePromise;
    const duties = await response.json();
    const firstRootDuty = duties.find((duty: IDuty) => duty.parent_id === null);
    const firstRootDutyElement = page.locator(`[aria-label="job-filter-menu-item-checkbox-${firstRootDuty.name}"]`);
    await firstRootDutyElement.click();

    const jobCount = await page.locator('[aria-label="selected-job-count"]').innerText();
    expect(jobCount).toBe('25');
  });
});
