using Microsoft.AspNetCore.Mvc;

namespace FCamara.CommissionCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommisionController : ControllerBase
    {
        [ProducesResponseType(typeof(CommissionCalculationResponse), 200)]
        [HttpPost]
        public IActionResult Calculate(CommissionCalculationRequest calculationRequest)
        {
            if (calculationRequest == null)
                return BadRequest("Invalid request");

            decimal FCamaraLocalRate = 0.20m;
            decimal FCamaraForeignRate = 0.35m;
            decimal CompetitorLocalRate = 0.02m;
            decimal CompetitorForeignRate = 0.0755m;

            var fCamaraCommission =
                (calculationRequest.LocalSalesCount * calculationRequest.AverageSaleAmount * FCamaraLocalRate) +
                (calculationRequest.ForeignSalesCount * calculationRequest.AverageSaleAmount * FCamaraForeignRate);

            var competitorCommission =
                (calculationRequest.LocalSalesCount * calculationRequest.AverageSaleAmount * CompetitorLocalRate) +
                (calculationRequest.ForeignSalesCount * calculationRequest.AverageSaleAmount * CompetitorForeignRate);

            return Ok(new CommissionCalculationResponse()
            {
                FCamaraCommissionAmount = fCamaraCommission,
                CompetitorCommissionAmount = competitorCommission

            });
        }
    }

    public class CommissionCalculationRequest
    {
        public int LocalSalesCount { get; set; }
        public int ForeignSalesCount { get; set; }
        public decimal AverageSaleAmount { get; set; }
    }

    public class CommissionCalculationResponse
    {
        public decimal FCamaraCommissionAmount { get; set; }

        public decimal CompetitorCommissionAmount { get; set; }
    }
}
