import React from "react";
import { ReactDOM } from "react";
import axios from "axios";
import './Admin.css';

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product: [],
			id: null,
			namep: "",
			price: "",
			quantity: "",
			img: "",
			desc: ""
		};
	}
	setStatus = () => {
		this.setState({ showAddForm: !this.state.showAddForm });
	}
	componentDidMount() {
		axios
			.get("https://63a572122a73744b008e28d5.mockapi.io/api/Products")
			.then(response => {
				this.setState({ product: response.data });
			})
			.catch(error => {
				console.log(error);
			});
	}
	deleteBook = (id) => {
		axios
			.delete("https://63a572122a73744b008e28d5.mockapi.io/api/Products/" + id)
			.then(response => {
				console.log(response);
				const product = this.state.product.filter(item => item.id !== id);
				this.setState({ product });
			})
			.catch(error => {
				console.log(error);
			});
	}
	addBook = () => {
		const Productlist = {
			namep: this.state.namep,
			price: this.state.price,
			quantity: this.state.quantity,
			img: this.state.img
		};
		axios
			.post("https://63a572122a73744b008e28d5.mockapi.io/api/Products", Productlist)
			.then(response => {
				console.log(response);
				const product = [...this.state.product, response.data];
				this.setState({ product });
			})
			.catch(error => {
				console.log(error);
			});
	}
	editBook = (id) => {
		const Productlist = this.state.product.find(item => item.id === id);
		this.setState({
			id: id,
			namep: Productlist.namep,
			price: Productlist.price,
			quantity: Productlist.quantity,
			img: Productlist.img,
			showEditForm: true
		});
	}
	formAddBook = () => {
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<div className="card">
							<div className="card-body">
								<div className="form-group">
									<label>Ten San Pham</label>
									<input type="text" className="form-control" onChange={(e) => this.setState({ namep: e.target.value })} />
								</div>
								<div className="form-group">
									<label> price</label>
									<input type="text" className="form-control" onChange={(e) => this.setState({ price: e.target.value })} />
								</div>
								<div className="form-group">
									<label>So luong</label>
									<input type="number" className="form-control" onChange={(e) => this.setState({ quantity: e.target.value })} />
								</div>
								<div className="form-group">
									<label>img</label>
									<input type="text" className="form-control" onChange={(e) => this.setState({ img: e.target.value })} />
								</div>
								<button type="button" className="btn btn-primary" onClick={this.addBook}>Add</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	formEditBook = () => {
		return (
			<form onSubmit={this.updateBook}>
				<div className="form-group">
					<label htmlFor="name">Tên Sản Phẩm</label>
					<input type="text"id="name"className="form-control"value={this.state.namep}onChange={e => this.setState({ namep: e.target.value })}/>
				</div>
				<div className="form-group">
					<label htmlFor="price">Giá</label>
					<input type="text"id="price"className="form-control"value={this.state.price}onChange={e => this.setState({ price: e.target.value })}/>
				</div>
				<div className="form-group">
					<label htmlFor="quantity">Số Lượng</label>
					<input type="text"id="quantity"className="form-control"value={this.state.quantity}onChange={e => this.setState({ quantity: e.target.value })}/>
				</div>
				<div className="form-group">
					<label htmlFor="img">img</label>
					<input type="text"id="img"className="form-control"value={this.state.img}onChange={e => this.setState({ img: e.target.value })}/>
				</div>
				<button type="submit" className="btn btn-primary" onClick={this.editBook}>Update</button>
			</form>
		);
	}
	updateBook = () => {
		const Productlist = {
			namep: this.state.namep,
			price: this.state.price,
			quantity: this.state.quantity,
			img: this.state.img
		};
		axios
			.put("https://63a572122a73744b008e28d5.mockapi.io/api/Products/" + this.state.id, Productlist)
			.then(response => {
				console.log(response);
				const product = this.state.product.map(item => {
					if (item.id === this.state.id) {
						return Productlist;
					}
					return item;
				});
				this.setState({ product });
			})
			.catch(error => {
				console.log(error);
			}
			);
	}
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<div className="card">
								<div className="card-body">
									<h4 className="Title_table">Product</h4>
									<p className="card-text">
										<button className="AddBtn" onClick={this.setStatus}>
											{this.state.showAddForm ? "Cancel" : "Add Sản Phẩm Mới"}
										</button>
									</p>

									<table className="table table-bordered">
										<thead>
											<tr>
												<th>ID</th>
												<th>Tên Sản Phẩm</th>
												<th>Giá</th>
												<th>Số Lượng</th>
												<th>img</th>
												<th>Xóa</th>
												<th>Sửa</th>
											</tr>
										</thead>
										<tbody>
											{this.state.product.map((products) => (
												<tr>
													<td>
														<textbox
															type="text"
															name="id"
															onChange={this.handleChange}
														/>
														{products.id}
													</td>
													<td>{products.namep}</td>
													<td>{products.price}</td>
													<td>{products.quantity}</td>
													<td>{products.img}</td>
													<td>
														<button
															className="deleteBtn"
															onClick={() => this.deleteBook(products.id)}
														>
															Delete
														</button>
													</td>
													<td>
														<button
															className="editBtn"
															onClick={() => this.editBook(products.id)}
														>
															Edit
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							{this.state.showEditForm && !this.state.showAddForm && (
								this.formEditBook()
							)}

							{this.state.showAddForm && !this.state.showEditForm && (
								this.formAddBook()
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

}
export default Admin;