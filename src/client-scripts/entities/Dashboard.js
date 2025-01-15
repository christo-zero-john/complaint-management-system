class Dashboard {
  setDashboard(type) {
    if (type == "user") {
      this.user.setDashboard();
    }
    if (type == "admin") {
      this.admin.setDashboard();
    }
  }

  setNavbar(type) {
    if (type == "user") {
      this.user.setNavbar();
    }

    if (type == "admin") {
      this.admin.setNavbar();
    }

    if (type == "common") {
      this.common.setNavbar();
    }

    if (type == "reviewer") {
      this.reviewer.setNavbar();
    }
  }

  user = {
    setDashboard: async () => {
      console.log("Setting User Dashboard");

      let request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: window.user.id }),
      };

      fetch(`${server}/api/dashboard/user-dashboard-counts.php`, request)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          document.getElementById("total-my-complaints").innerText =
            data.returned.total_complaints;
          document.getElementById("rejected-my-complaints").innerText =
            data.returned.rejected_complaints;
          document.getElementById("resolved-my-complaints").innerText =
            data.returned.resolved_complaints;
          document.getElementById("closed-my-complaints").innerText =
            data.returned.closed_complaints;
        });
    },

    setNavbar: () => {
      let navDropdownHtml = "";

      if (window.user.checkAdmin(1)) {
        console.log("User is Admin");
        navDropdownHtml += `
        <li class="nav-item">
          <a href="../admin/dashboard.html" class="dropdown-item" id=""
            >Admin</a
          >
        </li>
        
      `;
      }

      if (window.user.checkReviewer(1)) {
        console.log("User is a reviewer");
        navDropdownHtml += `
        <li>
          <a
            href="../reviewer/dashboard.html"
            class="dropdown-item"
            id=""
            >Complaint Reviewer</a
          >
        </li>`;
      }

      navDropdownHtml += `      
        <li>
          <button
            class="dropdown-item link-danger"
            id=""
            onclick="window.user.logout()"
          >
            Logout
          </button>
        </li>`;

      let navBarEl = document.getElementById("user-navbar");
      if (navBarEl) {
        navBarEl.innerHTML = `
          <nav
            class="navbar navbar-expand-lg bg-body-tertiary border-bottom border-primary"
          >
            <div class="container-fluid">
              <p class="navbar-brand">user@complaints.mac</p>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/index.html">Home</a>
                  </li>

                  <li class="nav-item">
                    <a href="/pages/user/new-complaint.html" class="nav-link" id=""
                      >Create Complaint</a
                    >
                  </li>

                  <li class="nav-item">
                    <a href="/pages/user/my-complaints.html" class="nav-link" id=""
                      >My Complaints</a
                    >
                  </li>

                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Profile
                    </a>
                    <ul class="dropdown-menu col-6" id="nav-dropdown">${navDropdownHtml}</ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        `;
      } else {
        console.log("No user navbar element with id user-navbar found");
      }
    },
  };

  admin = {
    setNavbar: () => {
      let navDropdownHtml = "";

      if (window.user.checkLogin(1)) {
        console.log("User Logged In");
        navDropdownHtml += `
        <li class="nav-item">
          <a href="/pages/user/dashboard.html" class="dropdown-item" id=""
            >User</a
          >
        </li>
        
      `;
      }

      if (window.user.checkReviewer(1)) {
        console.log("User is a reviewer");
        navDropdownHtml += `
        <li>
          <a
            href="/pages/reviewer/dashboard.html"
            class="dropdown-item"
            id=""
            >Complaint Reviewer</a
          >
        </li>`;
      }

      navDropdownHtml += `      
        <li>
          <button
            class="dropdown-item link-danger"
            id=""
            onclick="window.user.logout()"
          >
            Logout
          </button>
        </li>`;

      let navBarEl = document.getElementById("admin-navbar");
      if (navBarEl) {
        navBarEl.innerHTML = `
          <nav
            class="navbar navbar-expand-lg bg-body-tertiary border-bottom border-primary"
          >
            <div class="container-fluid">
              <p class="navbar-brand fw-600 text-success">admin@complaints.mac</p>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/index.html">Home</a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="/pages/user/all-complaints.html">All Complaints</a>
                  </li>

                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Manage
                    </a>
                    <ul class="dropdown-menu col-md-6" id="nav-dropdown">
                      <li>
                        <a class="nav-link" href="/pages/admin/manage-departments.html">Departments</a>
                      </li>

                      <li>
                        <a class="nav-link" href="/pages/admin/manage-roles.html">Roles</a>
                      </li>

                      <li>
                        <a class="nav-link" href="/pages/admin/manage-categories.html">Categories</a>
                      </li>

                      <li>
                        <a class="nav-link" href="/pages/admin/manage-roles.html">Users</a>
                      </li>
                    </ul>
                  </li>

                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Profile
                    </a>
                    <ul class="dropdown-menu col-6" id="nav-dropdown">${navDropdownHtml}</ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        `;
      } else {
        console.log("No admin navbar element with id admin-navbar found");
      }
    },
    setDashboard: async () => {
      console.log("Setting Admin Dashboard");

      fetch(`${server}/api/dashboard/admin-dashboard-count.php`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let fields = {
            "total-departments": document.getElementById("total-departments"),
            "total-categories": document.getElementById("total-categories"),
            "total-roles": document.getElementById("total-roles"),
            "total-users": document.getElementById("total-users"),
            "total-complaints": document.getElementById("total-complaints"),
            "total-resolved-complaints": document.getElementById(
              "total-resolved-complaints"
            ),
            "total-rejected-complaints": document.getElementById(
              "total-rejected-complaints"
            ),
            "total-reviewers": document.getElementById("total-reviewers"),
          };

          for (let field in fields) {
            fields[field].innerText = data.returned[field];
          }
        });
    },
  };

  common = {
    setNavbar: () => {
      console.log("Setting common navbar");
      let navDropdownHtml = "";

      if (window.user.checkLogin(1)) {
        console.log("User Logged In");
        navDropdownHtml += `
        <li class="nav-item">
          <a href="/pages/user/dashboard.html" class="dropdown-item" id=""
            >User</a
          >
        </li>
        
      `;
      }

      if (window.user.checkAdmin(1)) {
        console.log("User is an admin");
        navDropdownHtml += `
        <li>
          <a
            href="/pages/reviewer/dashboard.html"
            class="dropdown-item"
            id=""
            >Admin</a
          >
        </li>`;
      }

      if (window.user.checkReviewer(1)) {
        console.log("User is a reviewer");
        navDropdownHtml += `
        <li>
          <a
            href="../reviewer/dashboard.html"
            class="dropdown-item"
            id=""
            >Complaint Reviewer</a
          >
        </li>`;
      }

      if (navDropdownHtml == "") {
        navDropdownHtml = `<li class="nav-item">
          <a href="/pages/user/login-signup.html" class="dropdown-item" id=""
            >Login/Signup</a
          >
        </li>`;
      } else {
        navDropdownHtml += `      
        <li>
          <button
            class="dropdown-item link-danger"
            id=""
            onclick="window.user.logout()"
          >
            Logout
          </button>
        </li>`;
      }

      // console.log(navDropdownHtml);

      let navBarEl = document.getElementById("common-navbar");
      if (navBarEl) {
        navBarEl.innerHTML = `
          <nav
            class="navbar navbar-expand-lg bg-body-tertiary border-bottom border-primary"
          >
            <div class="container-fluid">
              <p class="navbar-brand fw-600 text-warning">complaints.mac</p>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      aria-current="page"
                      href="https://mac.edu.in"
                      >MAC Home</a
                    >
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="/pages/user/all-complaints.html">All Complaints</a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="/pages/user/new-complaint.html">New Complaint</a>
                  </li>                  

                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Profile
                    </a>
                    <ul class="dropdown-menu col-6" id="nav-dropdown">${navDropdownHtml}</ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        `;
      } else {
        console.log("No admin navbar element with id admin-navbar found");
      }
    },
  };

  reviewer = {
    setNavbar: () => {
      let navDropdownHtml = "";

      if (window.user.checkLogin(1)) {
        console.log("User Logged In");
        navDropdownHtml += `
        <li class="nav-item">
          <a href="/pages/user/dashboard.html" class="dropdown-item" id=""
            >User</a
          >
        </li>
        
      `;
      }

      if (window.user.checkReviewer(1)) {
        console.log("User is a reviewer");
        navDropdownHtml += `
        <li>
          <a
            href="/pages/reviewer/dashboard.html"
            class="dropdown-item"
            id=""
            >Complaint Reviewer</a
          >
        </li>`;
      }

      navDropdownHtml += `      
        <li>
          <button
            class="dropdown-item link-danger"
            id=""
            onclick="window.user.logout()"
          >
            Logout
          </button>
        </li>`;

      let navBarEl = document.getElementById("reviewer-navbar");
      if (navBarEl) {
        navBarEl.innerHTML = `
          <nav
            class="navbar navbar-expand-lg bg-body-tertiary border-bottom border-primary"
          >
            <div class="container-fluid">
              <p class="navbar-brand fw-600 text-danger">reviewer@complaints.mac</p>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/index.html">Home</a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="/pages/user/all-complaints.html">All Complaints</a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="##" onclick="window.reviewer.assignedComplaints()">Assigned Complaints</a>
                  </li>    

                  <li class="nav-item">
                    <a class="nav-link" href="##" onclick="window.reviewer.resolvedComplaints()">Resolved Complaints</a>
                  </li>              

                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Profile
                    </a>
                    <ul class="dropdown-menu col-6" id="nav-dropdown">${navDropdownHtml}</ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        `;
      } else {
        console.log("No admin navbar element with id reviewer-navbar found");
      }
    },
  };
}

export { Dashboard };
