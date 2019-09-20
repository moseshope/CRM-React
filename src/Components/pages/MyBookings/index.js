import React, { Component } from "react";
import Layout from "../../core/Layout";
import {
  getOwnerBookings,
  changeVerificationStatus
} from "../../../Utils/Requests/Booking";
import ReactDatatable from "@ashvin27/react-datatable";
import moment from "moment";
import Swal from "sweetalert2";

class MyBookings extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        key: "sn",
        text: "S.N",
        className: "id",
        align: "left",
        sortable: true
      },
      {
        key: "busNumber",
        text: "Bus Number",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "departure_time",
        text: "Departure time",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "journeyDate",
        text: "Journey Date",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "clientName",
        text: "Client Name",
        className: "clientName",
        align: "left",
        sortable: true
      },
      {
        key: "bookedDate",
        text: "Booked Date",
        className: "date",
        align: "left",
        sortable: true
      },
      {
        key: "verification",
        text: "Status",
        className: "date",
        align: "left",
        sortable: true
      },
      {
        key: "action",
        text: "Action",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        cell: record => {
          return (
            <>
              <button
                data-toggle="modal"
                data-target="#update-user-modal"
                className="btn btn-primary btn-sm"
                onClick={this.toggleVerify(record._id, record.verification)}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-book"></i>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => this.deleteRecord(record.slug)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          );
        }
      }
    ];

    this.config = {
      page_size: 10,
      length_menu: [10, 20, 50],
      filename: "Bookings",
      no_data_text: "No bookings found!",
      button: {
        excel: true,
        print: true,
        csv: true
      },
      language: {
        length_menu: "Show _MENU_ result per page",
        filter: "Filter in records...",
        info: "Showing _START_ to _END_ of _TOTAL_ records",
        pagination: {
          first: "First",
          previous: "Previous",
          next: "Next",
          last: "Last"
        }
      },
      show_length_menu: true,
      show_filter: true,
      show_pagination: true,
      show_info: true
    };

    this.state = {
      bookings: [],
      isLoading: true,
      error: "",
      clientName: "",
      busNumber: ""
    };
  }

  componentDidMount() {
    this.fetchBookings();
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.bookings === this.state.bookings) {
      this.fetchBookings();
    }
  }

  toggleVerify = (id, status) => async e => {
    let toggledVerification =
      status === "verified" ? "notverified" : "verified";

    Swal.fire({
      title: "Are you sure?",
      text: "You are changing the verification status",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    }).then(async result => {
      if (result.value) {
        const resp = await changeVerificationStatus(
          id,
          toggledVerification
        ).catch(err => {
          this.setState({ error: err.response.data.error });
        });
        if (resp && resp.status === 200) {
          Swal.fire(`${toggledVerification}!`, "Your file has been updated.", "success");
          this.setState({});
        }
      }
    });
  };

  deleteRecord = slug => {
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   type: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!"
    // }).then(async result => {
    //   if (result.value) {
    //     const resp = await removeBus(slug).catch(err => {
    //       this.setState({ error: err.response.data.error });
    //     });
    //     if (resp && resp.status === 200) {
    //       Swal.fire("Deleted!", "Your file has been deleted.", "success");
    //       this.setState({});
    //     }
    //   }
    // });
  };

  fetchBookings = async () => {
    console.log("this.fetchBookings()");

    const resp = await getOwnerBookings().catch(err => {
      this.setState({ error: err.response.data.error, isLoading: false });
    });

    if (resp && resp.status === 200) {
      let counter = 1;
      resp.data.map(booking => {
        booking.bookedDate = moment(booking.createdAt).format("MMMM Do, YYYY");
        booking.journeyDate = moment(booking.bus.journeyDate).format("MMMM Do, YYYY");
        booking.sn = counter;
        counter++;
        booking.clientName = booking.guest
          ? booking.guest.name
          : booking.user.name;
        booking.busNumber = booking.bus.busNumber;
        booking.departure_time = booking.bus.departure_time
        return booking;
      });
      this.setState({ bookings: resp.data, isLoading: false });
    }
  };

  pageChange = pageData => {
    console.log("OnPageChange", pageData);
  };

  render() {
    console.log(this.state);
    return (
      <Layout title="My Bookings">
        <div className="d-flex" id="wrapper">
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <button className="btn btn-link mt-3" id="menu-toggle"></button>

              <h1 className="mt-2 text-primary">My Bookings</h1>
              {this.state.isLoading ? (
                <img src="/img/spinner.gif" alt="" className="spinner" />
              ) : (
                <ReactDatatable
                  config={this.config}
                  records={this.state.bookings}
                  columns={this.columns}
                  onPageChange={this.pageChange}
                />
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default MyBookings;
