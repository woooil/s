import * as React from 'react'
import { createElement, ReactElement, SVGAttributes, memo } from 'react'
import { v4 as uuid } from 'uuid'
import { Props } from './ComponentProps'

/**
 * Represents any shapes by the definition related to other shapes.
 *
 * This is defined by the relational definition consisting of two parts:
 * The dependencies, which are the other RShapes this RShape depends on, and the prop, the additional information for this RShape to be defined.
 * The relational definition is resolved into the resolved definition which is independent from any other RShapes and complete by itself, meaning that this RShape is finally determined only if resolved.
 *
 * @hierarchy RShape
 */
abstract class RShape<T extends SVGElement> {
  /**
   * The prefix of the id.
   */
  private static ID_PREFIX = 'rs-'
  /**
   * The identifier of this RShape.
   */
  readonly id: string
  /**
   * The list of RShapes on which this RShape depends.
   */
  protected __dependencies: RShape<any>[]
  /**
   * The list of RShapes on which this RShape depends.
   */
  public get dependencies() {
    return this.__dependencies
  }
  /**
   * The properties of this RShape.
   */
  protected __prop: any
  /**
   * The properties of this RShape.
   */
  public get prop() {
    return this.__prop
  }
  /**
   * The styles of this RShape.
   */
  public style: SVGAttributes<T>
  /**
   * The type of the resolved of RShape.
   */
  public static RES_TYPE: string
  /**
   * The type of relational definition of RShape.
   */
  public static REL_TYPE: string
  /**
   * The type of the resolved of RShape.
   */
  readonly resType: string
  /**
   * The type of relational definition of RShape.
   */
  readonly relType: string

  /**
   * Resolves this RShape into its resolved definition.
   */
  public abstract resolve(): any

  protected __Component: (prop: Props<any, T>) => ReactElement
  public get Component() {
    return this.__Component
  }

  /**
   * Returns React SVG Component displaying this RShape.
   */
  public component(props?: any) {
    // return this.Component({ resolved: this.resolve(), style: this.style, key: this.id, ...props })
    return createElement(this.Component, { resolved: this.resolve(), style: this.style, key: this.id, id: this.id, ...props })
  }

  /**
   * Assigns properties to this RShape. id is auto-generated using uuid().
   */
  constructor(
    dependencies: RShape<any>[],
    prop: any,
    style: SVGAttributes<T>,
    resType: string,
    relType: string,
  ) {
    this.id = `${RShape.ID_PREFIX}${uuid()}`
    this.__dependencies = dependencies
    this.__prop = prop
    this.style = style
    this.resType = resType
    this.relType = relType
  }
}

export { RShape }
