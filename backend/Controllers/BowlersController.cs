using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BowlersController : ControllerBase
{
    private readonly BowlingContext _context;

    public BowlersController(BowlingContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        // Only return bowlers who are on the Marlins or Sharks teams
        var allowedTeams = new[] { "Marlins", "Sharks" };

        var query = _context.Bowlers
            .Include(b => b.Team)
            .Where(b => b.Team != null && allowedTeams.Contains(b.Team.TeamName))
            .Select(b => new
            {
                First = b.BowlerFirstName,
                Middle = b.BowlerMiddleInit,
                Last = b.BowlerLastName,
                TeamName = b.Team!.TeamName,
                Address = b.BowlerAddress,
                City = b.BowlerCity,
                State = b.BowlerState,
                Zip = b.BowlerZip,
                Phone = b.BowlerPhoneNumber
            });

        var results = await query.ToListAsync();

        return Ok(results);
    }
}
