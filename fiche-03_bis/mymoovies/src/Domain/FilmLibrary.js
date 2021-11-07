class FilmLibrary {
  constructor() {
    this.FilmLibrary = [];
  }

  addFilm(film) {
    if (!film) return false;
    this.FilmLibrary.push({ ...film, id: this.nextFilmId() });
    return true;
  }

  getHtmlTable() {
    let htmlTable = `<div class="table-responsive p-5>
        <table class="table">
        <thead>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Budget (million)</th>
            </tr>
        </thead>
        <tbody>`;
    if (this.FilmLibrary && this.FilmLibrary.length > 0) {
      this.FilmLibrary.forEach((element) => {
        htmlTable += "<tr>";
        htmlTable += `<td>
                <a href="${element.link}" target="_blank"> ${element.title} </a> 
                </td>`; //solution prof : target="_blank"">
        htmlTable += `<td> ${element.duration} </td>
                              <td> ${element.budget} </td>
                              </tr>`;
      });
    }
    htmlTable += `</tbody>
    </table>
    </div>`;

    return htmlTable;
  }

  nextFilmId() {
    return this.FilmLibrary.length;
  }
}

export default FilmLibrary;
