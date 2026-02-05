import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import PageHeader from '../layout/PageHeader';
import { BookOpen } from 'lucide-react';

export default function ReferencesPage() {
  return (
    <PageWrapper pageNumber={11}>
      <PageHeader title="References" subtitle="Key studies and sources" icon={BookOpen} />

      <ol className="references-list">
        <li>Horvath S. DNA methylation age of human tissues and cell types. Genome Biology 14, R115 (2013).</li>
        <li>Lu AT, et al. DNA methylation GrimAge strongly predicts lifespan and healthspan. Aging (Albany NY) 11:303-327 (2019).</li>
        <li>Belsky DW, et al. Quantification of the pace of biological aging in humans through a blood test, the DunedinPoAm DNA methylation algorithm. eLife 9:e54870 (2020).</li>
        <li>Belsky DW, et al. DunedinPACE, a DNA methylation biomarker of the pace of aging. eLife 11:e73420 (2022).</li>
        <li>Levine ME, et al. An epigenetic biomarker of aging for lifespan and healthspan. Aging 10:573-591 (2018).</li>
        <li>Higgins-Chen AT, et al. A computational solution for bolstering reliability of epigenetic clocks: Implications for clinical trials and longitudinal tracking. Nature Aging 2:644-661 (2022).</li>
        <li>Wang Y, et al. Insights into ageing rates comparison across tissues from recalibrating cerebellum DNA methylation clock. GeroScience 45:2805-2819 (2023).</li>
        <li>Fahy GM, et al. Reversal of epigenetic aging and immunosenescent trends in humans. Aging Cell 18:e13028 (2019).</li>
        <li>Waziry R, et al. Effect of long-term caloric restriction on DNA methylation measures of biological aging in healthy adults from the CALERIE trial. Nature Aging 3:248-257 (2023).</li>
        <li>Longo VD, Anderson RM. Nutrition, longevity and disease: From molecular mechanisms to interventions. Cell 185:1455-1470 (2022).</li>
        <li>Willett W, et al. Food in the Anthropocene: the EAT-Lancet Commission on healthy diets from sustainable food systems. The Lancet 393:447-492 (2019).</li>
        <li>Ma H, et al. Adding salt to foods and hazard of premature mortality. European Heart Journal 43:2878-2888 (2022).</li>
        <li>McRae MP. The Benefits of Dietary Fiber Intake on Reducing the Risk of Cancer: An Umbrella Review of Meta-analyses. Journal of Chiropractic Medicine 17:90-96 (2018).</li>
        <li>Yang Y, et al. Association Between Dietary Fiber and Lower Risk of All-Cause Mortality: A Meta-Analysis of Cohort Studies. American Journal of Epidemiology 181:83-91 (2015).</li>
        <li>Olvera-Rosales LB, et al. Impact of the Gut Microbiota Balance on the Health-Disease Relationship: The Importance of Consuming Probiotics and Prebiotics. Foods 10:1261 (2021).</li>
        <li>Mikkelsen K, Apostolopoulos V. B Vitamins and Ageing. Sub-Cellular Biochemistry 90:451-470 (2018).</li>
        <li>Heath AK, et al. Vitamin D Status and Mortality: A Systematic Review of Observational Studies. International Journal of Environmental Research and Public Health 16:383 (2019).</li>
        <li>Vetter VM, et al. Epigenetic Clock and Leukocyte Telomere Length Are Associated with Vitamin D Status but not with Functional Assessments and Frailty in the Berlin Aging Study II. The Journals of Gerontology: Series A 75:2056-2063 (2020).</li>
        <li>Bjorklund G, et al. Selenium: An Antioxidant with a Critical Role in Anti-Aging. Molecules 27:6613 (2022).</li>
        <li>Harvanek ZM, et al. Psychological and biological resilience modulates the effects of stress on epigenetic aging. Translational Psychiatry 11:601 (2021).</li>
        <li>Epel ES, et al. Accelerated telomere shortening in response to life stress. Proceedings of the National Academy of Sciences 101:17312-17315 (2004).</li>
        <li>Liew SC, Aung T. Sleep deprivation and its association with diseases-a review. Sleep Medicine 42:192-204 (2021).</li>
        <li>Carroll JE, et al. Partial sleep deprivation activates the DNA damage response (DDR) and the senescence-associated secretory phenotype (SASP) in aged adult humans. Brain, Behavior, and Immunity 51:223-229 (2016).</li>
        <li>Piercy KL, et al. The Physical Activity Guidelines for Americans. JAMA 320:2020-2028 (2018).</li>
        <li>Garatachea N, et al. Exercise attenuates the major hallmarks of aging. Rejuvenation Research 18:57-89 (2015).</li>
        <li>Chambers JC, et al. Epigenome-wide association of DNA methylation markers in peripheral blood from Indian Asians and Europeans with incident type 2 diabetes: a nested case-control study. The Lancet Diabetes & Endocrinology 3:526-534 (2015).</li>
      </ol>
    </PageWrapper>
  );
}
